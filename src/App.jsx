import { useState } from "react";

const SECTIONS = [
  {
    id: "about",
    title: "About You",
    subtitle: "Help us understand who you are",
    questions: [
      {
        id: "life_stage",
        label: "Which best describes your current life stage?",
        type: "single",
        options: ["Student", "Early career professional", "Mid career professional", "Parent with children at home", "Retired", "Other"],
      },
      {
        id: "age",
        label: "Age range?",
        type: "single",
        options: ["18–24", "25–34", "35–44", "45–54", "55–65", "65+"],
      },
      {
        id: "gender",
        label: "Gender?",
        type: "single",
        options: ["Female", "Male", "Non-binary", "Prefer not to say"],
      },
      {
        id: "exercise",
        label: "How often do you exercise each week?",
        type: "single",
        options: ["Never or rarely", "1–2 times", "3–4 times", "5+ times"],
      },
    ],
  },
  {
    id: "habits",
    title: "Your Supplement Habits",
    subtitle: "Tell us about your current routine",
    questions: [
      {
        id: "current_supplements",
        label: "Do you currently take supplements?",
        type: "single",
        options: ["None", "1–2 daily", "3–4 daily", "5–7 daily", "8+"],
      },
      {
        id: "supplement_types",
        label: "Which supplements do you currently take? (Select all that apply)",
        type: "multi",
        options: ["Multivitamin", "Magnesium", "Omega-3 / Fish Oil", "Protein Powder", "Probiotics", "Collagen", "Fiber supplement", "Greens powder", "Other"],
      },
      {
        id: "tried_greens",
        label: "Have you ever tried a greens powder or all-in-one supplement?",
        type: "single",
        options: ["Yes, and I still use one", "Yes, but I stopped", "No, but I'm curious", "No, not interested"],
      },
      {
        id: "consistency",
        label: "How consistent are you at taking your supplements?",
        type: "single",
        options: ["Rarely take them", "Often forget", "Somewhat consistent", "Very consistent"],
      },
      {
        id: "monthly_spend",
        label: "How much do you spend on supplements per month?",
        type: "single",
        options: ["$0", "Under $50", "$50–$100", "$100–$150", "$150+"],
      },
    ],
  },
  {
    id: "pain",
    title: "Your Pain Points",
    subtitle: "What's frustrating about your current routine?",
    questions: [
      {
        id: "frustrations",
        label: "What frustrates you most about your current supplement routine? (Select all that apply)",
        type: "multi",
        options: ["Too many pills to take", "Hard to remember", "Bad taste", "Mixing or prep required", "Too expensive", "Not sure they actually work", "Inconsistent with routine", "Nothing — I'm satisfied"],
      },
      {
        id: "health_goal",
        label: "What is your primary health goal right now?",
        type: "single",
        options: ["More energy", "Longevity / healthy aging", "Strength or performance", "Mental clarity / focus", "Weight management", "Gut health", "Other"],
      },
      {
        id: "convenience_importance",
        label: "How important is convenience in your daily nutrition routine?",
        type: "single",
        options: ["Not important", "Somewhat important", "Very important", "Essential"],
      },
      {
        id: "decision_factors",
        label: "What matters most when choosing a supplement? (Pick up to 2)",
        type: "multi",
        max: 2,
        options: ["Convenience", "Comprehensive nutrients", "Energy support", "Longevity benefits", "Clean / natural ingredients", "Price", "Taste", "Brand trust"],
      },
    ],
  },
  {
    id: "concept",
    title: "The Baseline Concept",
    subtitle: "A daily nutrient bite — not a pill, not a powder",
    intro: "Imagine a 25g daily bite — made with almonds, dates, flax, and magnesium — that replaces your entire supplement stack. Under 100 calories. One step. Every day.",
    questions: [
      {
        id: "concept_interest",
        label: "How interested would you be in a product like this?",
        type: "scale",
        options: ["Not interested", "Somewhat interested", "Very interested", "Extremely interested"],
      },
      {
        id: "replace_likelihood",
        label: "How likely would you be to replace your current supplements with this?",
        type: "scale",
        options: ["Not likely", "Somewhat likely", "Likely", "Very likely"],
      },
      {
        id: "format_preference",
        label: "What format would you most prefer for a daily supplement replacement?",
        type: "single",
        options: ["A bite / bar (like Baseline)", "A drink or shake", "A single capsule / pill", "A gummy", "A powder to mix"],
      },
      {
        id: "taste_priority",
        label: "How important is taste when it comes to a daily nutrition product?",
        type: "single",
        options: ["Doesn't matter at all", "Slightly important", "Important", "It's a dealbreaker if it tastes bad"],
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing & Purchase Intent",
    subtitle: "Help us understand what feels fair",
    questions: [
      {
        id: "expected_price",
        label: "If Baseline replaced your current supplements, what monthly price would feel fair for 30 bites?",
        type: "single",
        options: ["Under $50", "$50–$69", "$70–$89", "$90–$109", "$110+"],
      },
      {
        id: "subscription",
        label: "Would you subscribe monthly in exchange for a discount (e.g. 15–20% off)?",
        type: "single",
        options: ["Yes, absolutely", "Maybe, depends on the discount", "Probably not", "No"],
      },
      {
        id: "buy_channel",
        label: "Where would you most likely purchase a product like this?",
        type: "single",
        options: ["Brand website / subscription", "Amazon", "Whole Foods / specialty grocery", "Target / Walmart", "Local health store"],
      },
      {
        id: "would_buy",
        label: "Would you actually buy Baseline when it launches?",
        type: "single",
        options: ["Yes, sign me up", "Probably yes", "Maybe", "Probably not", "No"],
      },
    ],
  },
  {
    id: "final",
    title: "One Last Thing",
    subtitle: "We read every response",
    questions: [
      {
        id: "open_feedback",
        label: "Is there anything about your current supplement routine or health goals you wish more brands understood?",
        type: "text",
        placeholder: "Share anything on your mind...",
      },
      {
        id: "waitlist",
        label: "Would you like to join the Baseline waitlist for early access and free samples?",
        type: "single",
        options: ["Yes, sign me up!", "Maybe later", "No thanks"],
      },
      {
        id: "email",
        label: "Email address (optional — enter to be added to the waitlist and entered in the $200 giveaway)",
        type: "email",
        placeholder: "you@example.com",
      },
    ],
  },
];

const TOTAL = SECTIONS.length;

export default function BaselineSurvey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const section = SECTIONS[step];
  const progress = ((step) / TOTAL) * 100;

  function handleSingle(qid, val) {
    setAnswers(a => ({ ...a, [qid]: val }));
  }

  function handleMulti(qid, val, max) {
    setAnswers(a => {
      const prev = a[qid] || [];
      if (prev.includes(val)) return { ...a, [qid]: prev.filter(v => v !== val) };
      if (max && prev.length >= max) return { ...a, [qid]: [...prev.slice(1), val] };
      return { ...a, [qid]: [...prev, val] };
    });
  }

  function handleText(qid, val) {
    setAnswers(a => ({ ...a, [qid]: val }));
  }

  function next() {
    if (step < TOTAL - 1) setStep(s => s + 1);
    else setSubmitted(true);
  }

  function back() {
    if (step > 0) setStep(s => s - 1);
  }

  const scaleColors = ["#d1d5db", "#93c5fd", "#60a5fa", "#16a34a"];

  const wouldBuy = answers["would_buy"];
  const isInterestedBuyer = wouldBuy === "Yes, sign me up" || wouldBuy === "Probably yes";

  if (submitted) {
    return (
      <div style={styles.shell}>
        <div style={styles.header}>
          <div style={styles.logo}>BASELINE</div>
        </div>
        <div style={styles.card}>
          <div style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
            <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🌱</div>
            <h2 style={{ fontFamily: "sans-serif", fontSize: "1.8rem", fontWeight: 700, color: "#111827", marginBottom: "0.75rem" }}>
              {isInterestedBuyer ? "You're in. Welcome to Baseline." : "Thank you."}
            </h2>
            <p style={{ color: "#6b7280", fontSize: "1rem", lineHeight: 1.7, maxWidth: 380, margin: "0 auto 1.5rem", fontFamily: "sans-serif" }}>
              {isInterestedBuyer
                ? "Your feedback directly shapes Baseline. You'll be first to know when we launch — and first in line for free samples."
                : "Your feedback directly shapes Baseline. We really appreciate you taking the time."}
            </p>

            <div style={styles.tag}>Baseline — One Bite. Every Day.</div>

            {isInterestedBuyer && (
              <div style={{ marginTop: "2rem" }}>
                <p style={{ color: "#374151", fontSize: "0.9rem", marginBottom: "1rem", fontFamily: "sans-serif" }}>
                  Want to see what we're building?
                </p>
                <a
                  href="https://baselinebite.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.ctaButton}
                >
                  Visit baselinebite.com →
                </a>
              </div>
            )}

            <p style={{ fontSize: "0.78rem", color: "#9ca3af", marginTop: "2.5rem", fontFamily: "sans-serif" }}>
              🎉 One participant will be selected to win $200. Winner notified by email.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.shell}>
      <div style={styles.header}>
        <div style={styles.logo}>BASELINE</div>
        <div style={styles.stepLabel}>{step + 1} / {TOTAL}</div>
      </div>

      <div style={styles.progressTrack}>
        <div style={{ ...styles.progressFill, width: `${progress}%` }} />
      </div>

      {step === 0 && (
        <div style={styles.giveawayBanner}>
          🎉 Complete this 2-minute survey for a chance to <strong>win $200</strong>
        </div>
      )}

      <div style={styles.card}>
        <div style={styles.sectionMeta}>
          <span style={styles.tag}>{section.title}</span>
          <p style={styles.sectionSubtitle}>{section.subtitle}</p>
        </div>

        {section.intro && (
          <div style={styles.introBanner}>
            <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.7 }}>{section.intro}</p>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {section.questions.map((q) => (
            <div key={q.id}>
              <p style={styles.qLabel}>{q.label}</p>

              {(q.type === "single") && (
                <div style={styles.optionGrid}>
                  {q.options.map(opt => {
                    const sel = answers[q.id] === opt;
                    return (
                      <button key={opt} onClick={() => handleSingle(q.id, opt)}
                        style={{ ...styles.optionBtn, ...(sel ? styles.optionBtnSel : {}) }}>
                        {sel && <span style={styles.checkDot} />}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {(q.type === "multi") && (
                <div style={styles.optionGrid}>
                  {q.options.map(opt => {
                    const sel = (answers[q.id] || []).includes(opt);
                    return (
                      <button key={opt} onClick={() => handleMulti(q.id, opt, q.max)}
                        style={{ ...styles.optionBtn, ...(sel ? styles.optionBtnSel : {}) }}>
                        {sel && <span style={styles.checkDot} />}
                        {opt}
                      </button>
                    );
                  })}
                  {q.max && <p style={{ fontSize: "0.75rem", color: "#9ca3af", margin: "0.25rem 0 0", gridColumn: "1/-1" }}>Pick up to {q.max}</p>}
                </div>
              )}

              {(q.type === "scale") && (
                <div style={styles.scaleRow}>
                  {q.options.map((opt, i) => {
                    const sel = answers[q.id] === opt;
                    return (
                      <button key={opt} onClick={() => handleSingle(q.id, opt)}
                        style={{
                          ...styles.scaleBtn,
                          backgroundColor: sel ? scaleColors[i] : "#f3f4f6",
                          color: sel ? (i >= 2 ? "#fff" : "#111") : "#374151",
                          borderColor: sel ? scaleColors[i] : "#e5e7eb",
                          fontWeight: sel ? 700 : 400,
                        }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {(q.type === "text") && (
                <textarea rows={4} placeholder={q.placeholder}
                  value={answers[q.id] || ""}
                  onChange={e => handleText(q.id, e.target.value)}
                  style={styles.textarea} />
              )}

              {(q.type === "email") && (
                <input type="email" placeholder={q.placeholder}
                  value={answers[q.id] || ""}
                  onChange={e => handleText(q.id, e.target.value)}
                  style={styles.input} />
              )}
            </div>
          ))}
        </div>

        <div style={styles.navRow}>
          {step > 0 && (
            <button onClick={back} style={styles.backBtn}>← Back</button>
          )}
          <button onClick={next} style={styles.nextBtn}>
            {step === TOTAL - 1 ? "Submit →" : "Continue →"}
          </button>
        </div>
      </div>

      <p style={styles.footer}>Your responses are anonymous and used only to improve Baseline.</p>
    </div>
  );
}

const styles = {
  shell: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #f0fdf4 0%, #fafaf9 60%, #f0f9ff 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 1rem 3rem",
    fontFamily: "'Georgia', 'Times New Roman', serif",
  },
  header: {
    width: "100%",
    maxWidth: 640,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5rem 0 0.5rem",
  },
  logo: {
    fontSize: "1rem",
    fontWeight: 700,
    letterSpacing: "0.2em",
    color: "#166534",
    fontFamily: "'Trebuchet MS', sans-serif",
  },
  stepLabel: {
    fontSize: "0.8rem",
    color: "#9ca3af",
    letterSpacing: "0.05em",
    fontFamily: "sans-serif",
  },
  progressTrack: {
    width: "100%",
    maxWidth: 640,
    height: 3,
    background: "#e5e7eb",
    borderRadius: 99,
    marginBottom: "1rem",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #16a34a, #4ade80)",
    borderRadius: 99,
    transition: "width 0.4s ease",
  },
  giveawayBanner: {
    width: "100%",
    maxWidth: 640,
    background: "linear-gradient(90deg, #166534, #16a34a)",
    color: "#fff",
    textAlign: "center",
    fontSize: "0.85rem",
    padding: "0.65rem 1rem",
    borderRadius: 10,
    marginBottom: "1rem",
    fontFamily: "sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 640,
    background: "#fff",
    borderRadius: 20,
    padding: "2rem 2rem 1.5rem",
    boxShadow: "0 4px 40px rgba(0,0,0,0.07)",
    border: "1px solid #e5e7eb",
  },
  sectionMeta: {
    marginBottom: "1.5rem",
  },
  tag: {
    display: "inline-block",
    background: "#dcfce7",
    color: "#166534",
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "0.3rem 0.75rem",
    borderRadius: 99,
    fontFamily: "sans-serif",
    marginBottom: "0.5rem",
  },
  sectionSubtitle: {
    color: "#6b7280",
    fontSize: "0.9rem",
    margin: 0,
    fontFamily: "sans-serif",
  },
  introBanner: {
    background: "linear-gradient(135deg, #f0fdf4, #ecfdf5)",
    border: "1px solid #bbf7d0",
    borderRadius: 12,
    padding: "1rem 1.25rem",
    marginBottom: "1.75rem",
    color: "#166534",
    fontFamily: "sans-serif",
  },
  qLabel: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#111827",
    marginBottom: "0.75rem",
    marginTop: 0,
    lineHeight: 1.5,
    fontFamily: "sans-serif",
  },
  optionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "0.5rem",
  },
  optionBtn: {
    padding: "0.6rem 1rem",
    border: "1.5px solid #e5e7eb",
    borderRadius: 10,
    background: "#fafafa",
    color: "#374151",
    fontSize: "0.85rem",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.15s",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: "sans-serif",
  },
  optionBtnSel: {
    border: "1.5px solid #16a34a",
    background: "#f0fdf4",
    color: "#166534",
    fontWeight: 600,
  },
  checkDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#16a34a",
    flexShrink: 0,
  },
  scaleRow: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "0.5rem",
  },
  scaleBtn: {
    padding: "0.65rem 1rem",
    border: "1.5px solid",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: "0.85rem",
    transition: "all 0.2s",
    fontFamily: "sans-serif",
  },
  textarea: {
    width: "100%",
    borderRadius: 10,
    border: "1.5px solid #e5e7eb",
    padding: "0.75rem",
    fontSize: "0.9rem",
    fontFamily: "sans-serif",
    color: "#374151",
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
  },
  input: {
    width: "100%",
    borderRadius: 10,
    border: "1.5px solid #e5e7eb",
    padding: "0.75rem",
    fontSize: "0.9rem",
    fontFamily: "sans-serif",
    color: "#374151",
    outline: "none",
    boxSizing: "border-box",
  },
  navRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2rem",
    paddingTop: "1.25rem",
    borderTop: "1px solid #f3f4f6",
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#9ca3af",
    fontSize: "0.85rem",
    cursor: "pointer",
    fontFamily: "sans-serif",
    padding: "0.5rem 0",
  },
  nextBtn: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "0.75rem 2rem",
    fontSize: "0.9rem",
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: "0.03em",
    fontFamily: "sans-serif",
    marginLeft: "auto",
    transition: "background 0.2s",
  },
  ctaButton: {
    display: "inline-block",
    background: "#16a34a",
    color: "#fff",
    padding: "0.85rem 2rem",
    borderRadius: 12,
    fontSize: "0.95rem",
    fontWeight: 700,
    textDecoration: "none",
    fontFamily: "sans-serif",
    letterSpacing: "0.03em",
  },
  footer: {
    marginTop: "1.25rem",
    fontSize: "0.75rem",
    color: "#9ca3af",
    textAlign: "center",
    fontFamily: "sans-serif",
  },
};
