'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Grid,
  Column,
  Heading,
  ProgressIndicator,
  ProgressStep,
  Form,
  FormGroup,
  TextInput,
  Select,
  SelectItem,
  ButtonSet,
  Button,
  Checkbox,
  Tile,
  UnorderedList,
  ListItem,
} from '@carbon/react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STEPS = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'profile', label: 'Profile' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'complete', label: 'Complete' },
];

type StepErrors = {
  name?: string;
  email?: string;
  role?: string;
};

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [errors, setErrors] = useState<StepErrors>({});

  const isFirst = step === 0;
  const isLast = step === STEPS.length - 1;

  function validateStep(stepIndex: number): StepErrors {
    const next: StepErrors = {};
    if (stepIndex === 1) {
      if (!name.trim()) next.name = 'Name is required';
      if (!email.trim()) next.email = 'Email is required';
      else if (!EMAIL_REGEX.test(email)) next.email = 'Please enter a valid email address';
    }
    if (stepIndex === 2) {
      if (!role) next.role = 'Please select a role';
    }
    return next;
  }

  function handleNext() {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  }

  function handleBack() {
    setErrors({});
    if (step > 0) setStep((s) => s - 1);
  }

  function handleBlur() {
    setErrors(validateStep(step));
  }

  return (
    <Grid fullWidth className="main-content-grid">
      <Column lg={16} md={8} sm={4}>
        <Heading className="page-heading">Get started</Heading>
        <p style={{ marginBottom: '2rem' }}>
          Complete a few steps to set up your account.
        </p>

        <ProgressIndicator currentIndex={step} spaceEqually>
          {STEPS.map((s, i) => (
            <ProgressStep
              key={s.id}
              label={s.label}
              current={i === step}
              complete={i < step}
            />
          ))}
        </ProgressIndicator>

        <div style={{ marginTop: '2rem', maxWidth: '32rem' }}>
          {step === 0 && (
            <div>
              <h2 style={{ marginBottom: '1rem' }}>Welcome</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                Thanks for joining. This quick setup will help us personalize
                your experience. You can change these settings anytime later.
              </p>
            </div>
          )}

          {step === 1 && (
            <Form>
              <FormGroup legendText="Your profile">
                <TextInput
                  id="onboard-name"
                  labelText="Full name"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={handleBlur}
                  invalid={!!errors.name}
                  invalidText={errors.name}
                  className="form-field"
                />
                <TextInput
                  id="onboard-email"
                  labelText="Email"
                  type="email"
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleBlur}
                  invalid={!!errors.email}
                  invalidText={errors.email}
                  className="form-field"
                />
              </FormGroup>
            </Form>
          )}

          {step === 2 && (
            <Form>
              <FormGroup legendText="Preferences">
                <Select
                  id="onboard-role"
                  labelText="Role"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    if (errors.role) setErrors((prev) => ({ ...prev, role: undefined }));
                  }}
                  onBlur={handleBlur}
                  invalid={!!errors.role}
                  invalidText={errors.role}
                  className="form-field"
                >
                  <SelectItem value="" text="Choose an option" />
                  <SelectItem value="designer" text="Designer" />
                  <SelectItem value="developer" text="Developer" />
                  <SelectItem value="pm" text="Product Manager" />
                  <SelectItem value="other" text="Other" />
                </Select>
                <Checkbox
                  id="onboard-notifications"
                  labelText="Send me product updates and tips"
                  checked={notifications}
                  onChange={(_, { checked }) => setNotifications(!!checked)}
                  className="form-field"
                />
              </FormGroup>
            </Form>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ marginBottom: '1rem' }}>You&apos;re all set</h2>
              <p style={{ marginBottom: '1rem' }}>
                Here&apos;s what we have:
              </p>
              <Tile className="onboarding-summary">
                <UnorderedList>
                  <ListItem><strong>Name:</strong> {name || '—'}</ListItem>
                  <ListItem><strong>Email:</strong> {email || '—'}</ListItem>
                  <ListItem><strong>Role:</strong> {role || '—'}</ListItem>
                  <ListItem><strong>Notifications:</strong> {notifications ? 'On' : 'Off'}</ListItem>
                </UnorderedList>
              </Tile>
              <p style={{ marginTop: '1rem' }}>
                Click &quot;Complete&quot; to finish, or go back to change anything.
              </p>
            </div>
          )}

          <ButtonSet className="form-submit">
            {!isFirst && (
              <Button kind="secondary" onClick={handleBack}>
                Back
              </Button>
            )}
            {isLast ? (
              <Button
                onClick={() => {
                  confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                  });
                  confetti({
                    particleCount: 100,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                  });
                  confetti({
                    particleCount: 100,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                  });
                  setTimeout(() => {
                    setStep(0);
                    setName('');
                    setEmail('');
                    setRole('');
                    setNotifications(false);
                    setErrors({});
                  }, 2500);
                }}
              >
                Complete
              </Button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </ButtonSet>
        </div>
      </Column>
    </Grid>
  );
}
