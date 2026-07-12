import React, { useEffect, useState } from "react";
import { BarChart3, MessageSquare, Tag, Users } from "lucide-react";
import DonutChart from "./chart";
import type { ChartSlice } from "./chart";
import { useAuth } from "../context/AuthContext";
import {
  fetchFeaturedSurvey,
  fetchOptionsForSurvey,
  fetchOptionCounts,
  getUserVote,
  submitVote,
  fetchComments,
  addComment,
} from "../utils/surveyApi";
import type { Survey, SurveyOption, OptionCount, SurveyComment } from "../types/survey";
import "../style/featuredSurvey.css";

const SLICE_COLORS = ["#2563eb", "#16a34a", "#facc15", "#fb923c", "#ef4444", "#8b5cf6"];

const FeaturedSurveyWidget: React.FC = () => {
  const { user } = useAuth();

  const [survey, setSurvey] = useState<Survey | null>(null);
  const [options, setOptions] = useState<SurveyOption[]>([]);
  const [counts, setCounts] = useState<OptionCount[]>([]);
  const [votedOptionId, setVotedOptionId] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [comments, setComments] = useState<SurveyComment[]>([]);
  const [commentText, setCommentText] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [postingComment, setPostingComment] = useState(false);
  const [error, setError] = useState("");

  const loadAll = async (surveyId: number) => {
    const [optionsData, countsData, commentsData, voteData] = await Promise.all([
      fetchOptionsForSurvey(surveyId),
      fetchOptionCounts(surveyId),
      fetchComments(surveyId),
      user ? getUserVote(surveyId, user.id) : Promise.resolve(null),
    ]);
    setOptions(optionsData);
    setCounts(countsData);
    setComments(commentsData);
    if (voteData) setVotedOptionId(voteData.option_id);
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchFeaturedSurvey()
      .then(async (surveyData) => {
        if (!mounted) return;
        setSurvey(surveyData);
        if (surveyData) await loadAll(surveyData.id);
      })
      .catch((err) => mounted && setError(err.message || "Could not load the survey."))
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!survey) return;
    if (!user) {
      setError("Please log in to vote.");
      return;
    }
    if (!selected) {
      setError("Please choose an option first.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await submitVote(survey.id, selected, user.id);
      setVotedOptionId(selected);
      await loadAll(survey.id);
    } catch (err: any) {
      setError(err.message || "Could not submit your vote.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!survey || !user || !commentText.trim()) return;

    setPostingComment(true);
    try {
      await addComment(survey.id, user.id, commentText.trim());
      setCommentText("");
      const updated = await fetchComments(survey.id);
      setComments(updated);
    } catch (err: any) {
      setError(err.message || "Could not post your comment.");
    } finally {
      setPostingComment(false);
    }
  };

  if (loading) return <p className="featured-survey__status">Loading survey...</p>;
  if (!survey) return null;

  const totalResponses = counts.reduce((sum, c) => sum + Number(c.vote_count), 0);
  const chartData: ChartSlice[] = counts.map((c, index) => ({
    label: c.choice_text,
    value: Number(c.vote_count),
    percent: totalResponses ? Math.round((Number(c.vote_count) / totalResponses) * 100) : 0,
    color: SLICE_COLORS[index % SLICE_COLORS.length],
  }));

  return (
    <section className="featured-survey">
      <div className="featured-survey__grid">
        {/* Vote card */}
        <div className="featured-survey__card">
          <div className="featured-survey__header">
            <span className="featured-survey__icon">
              <BarChart3 size={20} />
            </span>
            <h2>{survey.question}</h2>
          </div>

          {votedOptionId ? (
            <>
              <p className="featured-survey__voted-note">
                Thanks for voting! You can still leave a comment below.
              </p>

              <form className="featured-survey__comment-form" onSubmit={handleComment}>
                <label>
                  <MessageSquare size={14} />
                  Add a comment (optional)
                </label>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Tell us more about your experience..."
                  rows={3}
                  disabled={!user}
                />
                <button type="submit" disabled={postingComment || !commentText.trim() || !user}>
                  {postingComment ? "Posting..." : "Post Comment"}
                </button>
              </form>

              {comments.length > 0 && (
                <div className="featured-survey__comments">
                  {comments.map((c) => (
                    <div key={c.id} className="featured-survey__comment">
                      <div className="featured-survey__comment-author">{c.author_name}</div>
                      <div className="featured-survey__comment-text">{c.comment}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <form onSubmit={handleVote}>
              <div className="featured-survey__options">
                {options.map((option) => (
                  <label
                    key={option.id}
                    className={`featured-survey__option ${
                      selected === option.id ? "featured-survey__option--selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="featured-survey-option"
                      checked={selected === option.id}
                      onChange={() => setSelected(option.id)}
                    />
                    {option.choice_text}
                  </label>
                ))}
              </div>

              {error && <p className="featured-survey__error">{error}</p>}

              <button type="submit" className="featured-survey__submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}

          {survey.category && (
            <div className="featured-survey__category">
              <span className="featured-survey__category-label">
                <Tag size={12} />
                Category
              </span>
              <span className="featured-survey__category-value">{survey.category}</span>
            </div>
          )}
        </div>

        {/* Results card */}
        <div className="featured-survey__card featured-survey__card--results">
          <h3>Survey Results</h3>

          <div className="featured-survey__chart-row">
            <DonutChart data={chartData} />
            <div className="featured-survey__legend">
              {chartData.map((slice) => (
                <div key={slice.label} className="featured-survey__legend-item">
                  <span
                    className="featured-survey__dot"
                    style={{ background: slice.color }}
                  />
                  <span className="featured-survey__legend-label">{slice.label}</span>
                  <span
                    className="featured-survey__legend-value"
                    style={{ color: slice.color }}
                  >
                    {slice.value} ({slice.percent}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="featured-survey__total">
            <span className="featured-survey__total-icon">
              <Users size={18} />
            </span>
            <div>
              <div className="featured-survey__total-label">Total Responses</div>
              <div className="featured-survey__total-value">{totalResponses}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSurveyWidget;
