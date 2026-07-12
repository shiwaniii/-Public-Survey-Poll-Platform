import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Users, BarChart3 } from "lucide-react";
import { fetchActiveSurveys, fetchOptionCounts } from "../utils/surveyApi";
import type { Survey, OptionCount } from "../types/survey";
import "../style/recentPollResults.css";

const BAR_COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444", "#8b5cf6", "#0891b2"];

interface SurveyWithCounts {
  survey: Survey;
  counts: OptionCount[];
}

const RecentPollResults: React.FC = () => {
  const [items, setItems] = useState<SurveyWithCounts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchActiveSurveys()
      .then(async (surveys) => {
        const withCounts = await Promise.all(
          surveys.map(async (survey) => ({
            survey,
            counts: await fetchOptionCounts(survey.id),
          }))
        );
        if (mounted) setItems(withCounts);
      })
      .catch(() => mounted && setItems([]))
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return null;
  if (items.length === 0) return null;

  return (
    <section className="recent-results">
      <div className="recent-results__header">
        <BarChart3 size={18} />
        <h2>Recent Poll Results</h2>
      </div>

      <div className="recent-results__grid">
        {items.map(({ survey, counts }) => {
          const total = counts.reduce((sum, c) => sum + Number(c.vote_count), 0);
          const chartData = counts.map((c) => ({
            name: c.choice_text,
            votes: Number(c.vote_count),
          }));

          return (
            <div key={survey.id} className="recent-results__card">
              <h3>{survey.question}</h3>

              <div className="recent-results__chart">
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#64748b" }} width={24} />
                    <Tooltip />
                    <Bar dataKey="votes" radius={[4, 4, 0, 0]}>
                      {chartData.map((_, index) => (
                        <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="recent-results__footer">
                <span className="recent-results__total">
                  <Users size={13} />
                  {total} response{total === 1 ? "" : "s"}
                </span>
                <Link to={`/surveys/${survey.id}/results`}>View full results</Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecentPollResults;