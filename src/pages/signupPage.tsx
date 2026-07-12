import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';

// Define the interface for form validation errors
interface SignUpErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  terms?: string;
  general?: string;
}

export const SurveyHubSignUp: React.FC = () => {
  const navigate = useNavigate();

  // 1. State Management
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

  const [errors, setErrors] = useState<SignUpErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // 2. Clear error on input change helpers
  const clearError = (field: keyof SignUpErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // 3. Form Submission Handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    const newErrors: SignUpErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!email.includes('@')) newErrors.email = 'Please enter a valid email address.';
    if (password.length < 8) newErrors.password = 'Password must be at least 8 characters.';
    if (!agreeTerms) newErrors.terms = 'You must agree to the terms and conditions.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrors({ general: error.message });
      setIsSubmitting(false);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase.from('Profile').insert({
        id: data.user.id,
        full_name: `${firstName} ${lastName}`,
        role: 'Volunteer',
      });

      if (profileError) {
        setErrors({ general: profileError.message });
        setIsSubmitting(false);
        return;
      }
    }

    setIsSubmitting(false);
    alert('Account created successfully! Welcome to SurveyHub. Please sign in.');
    navigate('/login');
  };

  return (
    <div style={styles.appContainer}>
      {/* Main Sign Up Content Area */}
      <main style={styles.mainContent}>
        <div style={styles.signupCard}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Create your account</h2>
            <p style={styles.cardSubtitle}>Join SurveyHub to design forms and analyze metropolitan feedback</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>

            {/* Dual Grid Row for First & Last Names */}
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="firstName" style={styles.formLabel}>First Name</label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => { setFirstName(e.target.value); clearError('firstName'); }}
                  placeholder="Alex"
                  style={{ ...styles.formInput, borderColor: errors.firstName ? '#ef4444' : '#e2e8f0' }}
                  disabled={isSubmitting}
                  required
                />
                {errors.firstName && <span style={styles.errorText}>{errors.firstName}</span>}
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="lastName" style={styles.formLabel}>Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => { setLastName(e.target.value); clearError('lastName'); }}
                  placeholder="Morgan"
                  style={{ ...styles.formInput, borderColor: errors.lastName ? '#ef4444' : '#e2e8f0' }}
                  disabled={isSubmitting}
                  required
                />
                {errors.lastName && <span style={styles.errorText}>{errors.lastName}</span>}
              </div>
            </div>

            {/* Email Field */}
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.formLabel}>Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); clearError('email'); }}
                placeholder="name@example.com"
                style={{ ...styles.formInput, borderColor: errors.email ? '#ef4444' : '#e2e8f0' }}
                disabled={isSubmitting}
                required
              />
              {errors.email && <span style={styles.errorText}>{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.formLabel}>Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value); clearError('password'); }}
                placeholder="At least 8 characters"
                style={{ ...styles.formInput, borderColor: errors.password ? '#ef4444' : '#e2e8f0' }}
                disabled={isSubmitting}
                required
              />
              {errors.password && <span style={styles.errorText}>{errors.password}</span>}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div style={styles.formGroup}>
              <label style={styles.termsLabel}>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => { setAgreeTerms(e.target.checked); clearError('terms'); }}
                  style={styles.checkbox}
                  disabled={isSubmitting}
                />
                <span>
                  I agree to the <a href="#terms" style={styles.inlineLink}>Terms of Service</a> and <a href="#privacy" style={styles.inlineLink}>Privacy Policy</a>.
                </span>
              </label>
              {errors.terms && <span style={styles.errorText}>{errors.terms}</span>}
            </div>

            {errors.general && (
              <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>
                {errors.general}
              </p>
            )}

            {/* Submit Action Button */}
            <button
              type="submit"
              style={{
                ...styles.submitBtn,
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating account...' : 'Get Started'}
            </button>
          </form>

          <div style={styles.footerNote}>
            Already have an account? <Link to="/login" style={styles.inlineLink}>Sign in</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

// UI Inline Styles Object (Matches Login styling exactly)
const styles: { [key: string]: React.CSSProperties } = {
  appContainer: {
    backgroundColor: '#f8fafc',
    minHeight: 'calc(100vh - 200px)',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2.5rem 1rem',
  },
  signupCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '480px',
    padding: '2.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  cardTitle: {
    fontSize: '1.75rem',
    fontWeight: 800,
    color: '#0f172a',
    marginBottom: '0.5rem',
  },
  cardSubtitle: {
    color: '#64748b',
    fontSize: '0.95rem',
    lineHeight: '1.4',
  },
  formRow: {
    display: 'flex',
    gap: '1rem',
  },
  formGroup: {
    marginBottom: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  formLabel: {
    fontSize: '0.9rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
    color: '#0f172a',
  },
  formInput: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.2s',
  },
  termsLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.6rem',
    fontSize: '0.85rem',
    cursor: 'pointer',
    color: '#64748b',
    lineHeight: '1.4',
  },
  checkbox: {
    marginTop: '0.15rem',
    cursor: 'pointer',
  },
  errorText: {
    color: '#ef4444',
    fontSize: '0.8rem',
    marginTop: '0.35rem',
    fontWeight: 500,
  },
  inlineLink: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: 600,
  },
  submitBtn: {
    width: '100%',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '0.85rem',
    fontSize: '1rem',
    fontWeight: 600,
    borderRadius: '8px',
    transition: 'background-color 0.2s',
  },
  footerNote: {
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '0.9rem',
    color: '#64748b',
  },
};

export default SurveyHubSignUp;