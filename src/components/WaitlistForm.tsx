import { useForm } from '@formspree/react'

export function WaitlistForm() {
  const [state, handleSubmit] = useForm('mgopqvpe')

  if (state.succeeded) {
    return (
      <div className="panel panel--success">
        <div className="panel__icon" aria-hidden="true">
          ✓
        </div>
        <p className="panel__text">
          You're on the list. We'll be in touch within 48 hours to schedule your free audit.
        </p>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__row">
        <div className="field">
          <label htmlFor="fullName" className="field__label">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            placeholder="Jane Smith"
            className="field__control"
          />
        </div>
        <div className="field">
          <label htmlFor="email" className="field__label">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@yourfirm.com.au"
            className="field__control"
          />
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="businessType" className="field__label">
            Business type
          </label>
          <select
            id="businessType"
            name="businessType"
            required
            defaultValue=""
            className="field__control field__control--select"
          >
            <option value="" disabled>
              Select your business type
            </option>
            <option value="Accounting firm">Accounting firm</option>
            <option value="Bookkeeping practice">Bookkeeping practice</option>
            <option value="Financial adviser">Financial adviser</option>
            <option value="Mortgage broker">Mortgage broker</option>
            <option value="Legal firm">Legal firm</option>
            <option value="Allied health">Allied health</option>
            <option value="Other service business">Other service business</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="teamSize" className="field__label">
            Team size
          </label>
          <select
            id="teamSize"
            name="teamSize"
            required
            defaultValue=""
            className="field__control field__control--select"
          >
            <option value="" disabled>
              Select team size
            </option>
            <option value="Just me">Just me</option>
            <option value="2-5 people">2–5 people</option>
            <option value="6-10 people">6–10 people</option>
            <option value="11-15 people">11–15 people</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="adminPain" className="field__label">
          Biggest admin pain point
        </label>
        <textarea
          id="adminPain"
          name="adminPain"
          required
          rows={3}
          placeholder="e.g. chasing clients for documents, manually sending updates, onboarding taking too long..."
          className="field__control"
        />
      </div>

      <div className="field">
        <label htmlFor="docCollection" className="field__label">
          How do you currently handle client document collection?
        </label>
        <textarea
          id="docCollection"
          name="docCollection"
          required
          rows={3}
          placeholder="e.g. email back and forth, we use a portal, clients drop things off..."
          className="field__control"
        />
      </div>

      {state.errors && <p className="form__error">Something went wrong. Please try again.</p>}

      <button type="submit" className="btn btn--primary" disabled={state.submitting}>
        {state.submitting ? 'Submitting...' : 'Get the Free Audit'}
      </button>
      <p className="form__fineprint">
        You’ll get a written report first. If it’s a fit, we’ll discuss implementation and pricing after.
      </p>
    </form>
  )
}

