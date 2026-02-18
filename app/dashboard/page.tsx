'use client';

import { useState, FormEvent } from 'react';
import {
  Grid,
  Column,
  Heading,
  Form,
  FormGroup,
  TextInput,
  TextArea,
  Button,
  InlineNotification,
} from '@carbon/react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export default function FormDemoPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!email.trim()) next.email = 'Email is required';
    else if (!EMAIL_REGEX.test(email)) next.email = 'Please enter a valid email address';
    if (!subject.trim()) next.subject = 'Subject is required';
    if (!message.trim()) next.message = 'Message is required';
    return next;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setShowSuccess(false);
      setTimeout(() => setShowSuccess(true), 0);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTouched({});
      setErrors({});
    }
  }

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const nextErrors = validate();
    setErrors(nextErrors);
  }

  return (
    <Grid fullWidth className="main-content-grid">
      <Column lg={16} md={8} sm={4}>
        <Heading className="page-heading">Form Demo</Heading>
        <p style={{ marginBottom: '1.5rem' }}>
          A simple contact form built with Carbon. All fields are required.
          Use the Send button to trigger validation; when everything is valid,
          a confirmation message appears.
        </p>

        {showSuccess && (
          <InlineNotification
            kind="success"
            title="Message sent"
            subtitle="Thanks for your message. We'll get back to you soon."
            onClose={() => setShowSuccess(false)}
            lowContrast
            style={{ marginBottom: '1.5rem' }}
          />
        )}

        <Form onSubmit={handleSubmit}>
          <FormGroup legendText="Contact details" className="form-demo-fieldset">
            <Grid fullWidth narrow className="form-demo-fieldset-grid">
              <Column lg={8} md={4} sm={4}>
                <TextInput
                  id="contact-name"
                  labelText="Name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => handleBlur('name')}
                  invalid={touched.name && !!errors.name}
                  invalidText={errors.name}
                  required
                  className="form-field"
                />
              </Column>
              <Column lg={8} md={4} sm={4}>
                <TextInput
                  id="contact-email"
                  labelText="Email"
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur('email')}
                  invalid={touched.email && !!errors.email}
                  invalidText={errors.email}
                  required
                  className="form-field"
                />
              </Column>
              <Column lg={16} md={8} sm={4}>
                <TextInput
                  id="contact-subject"
                  labelText="Subject"
                  placeholder="What is this about?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  onBlur={() => handleBlur('subject')}
                  invalid={touched.subject && !!errors.subject}
                  invalidText={errors.subject}
                  required
                  className="form-field"
                />
              </Column>
              <Column lg={16} md={8} sm={4}>
                <TextArea
                  id="contact-message"
                  labelText="Message"
                  placeholder="Your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onBlur={() => handleBlur('message')}
                  invalid={touched.message && !!errors.message}
                  invalidText={errors.message}
                  rows={4}
                  required
                  className="form-field"
                />
              </Column>
              <Column lg={16} md={8} sm={4}>
                <Button type="submit" className="form-submit">Send</Button>
              </Column>
            </Grid>
          </FormGroup>
        </Form>
      </Column>
    </Grid>
  );
}
