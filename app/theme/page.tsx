'use client';

import { useState } from 'react';
import {
  Grid,
  Column,
  Heading,
  RadioButtonGroup,
  RadioButton,
  FormGroup,
  TextInput,
  TextArea,
  Button,
  Tag,
  Tile,
  Dropdown,
  Checkbox,
  Toggle,
  Slider,
  Link,
  ProgressIndicator,
  ProgressStep,
} from '@carbon/react';
import { useTheme } from '@/components/ThemeProvider';
import type { ThemeMode } from '@/components/ThemeProvider';

const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: 'white', label: 'White' },
  { value: 'g10', label: 'Gray 10' },
  { value: 'g90', label: 'Gray 90' },
  { value: 'g100', label: 'Gray 100' },
];

export default function ThemeSwitcherPage() {
  const { theme, setTheme } = useTheme();
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <Grid fullWidth className="main-content-grid">
      <Column lg={16} md={8} sm={4}>
        <Heading className="page-heading">Theme Switcher</Heading>
        <p style={{ marginBottom: '1.5rem', maxWidth: '65ch' }}>
          Switch Carbon themes to see the design system in action. Each theme
          applies a consistent set of color tokens across all components.
        </p>

        <FormGroup legendText="Select theme" className="form-demo-fieldset">
          <RadioButtonGroup
            name="theme-selector"
            valueSelected={theme}
            onChange={(value) => setTheme(value as ThemeMode)}
            orientation="horizontal"
          >
            {THEME_OPTIONS.map((opt) => (
              <RadioButton
                key={opt.value}
                value={opt.value}
                labelText={opt.label}
                id={`theme-${opt.value}`}
              />
            ))}
          </RadioButtonGroup>
        </FormGroup>

        <div style={{ marginTop: '2rem' }}>
          <Heading style={{ marginBottom: '1rem', fontSize: '1rem' }}>
            Component preview
          </Heading>
          <p style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
            Carbon components in the current theme:
          </p>
          <Grid fullWidth>
            <Column lg={16} md={8} sm={4}>
              <Tile className="theme-preview" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Button size="sm">Small</Button>
                  <Button>Primary</Button>
                  <Button kind="secondary">Secondary</Button>
                  <Button kind="tertiary">Tertiary</Button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Tag type="red">Red</Tag>
                  <Tag type="blue">Blue</Tag>
                  <Tag type="green">Green</Tag>
                  <Tag type="purple">Purple</Tag>
                </div>
                <TextInput
                  id="theme-preview-input"
                  labelText="Text input"
                  placeholder="Placeholder text"
                  style={{ marginBottom: '1rem' }}
                />
                <TextArea
                  id="theme-preview-textarea"
                  labelText="Text area"
                  placeholder="Enter text..."
                  rows={2}
                  style={{ marginBottom: '1rem' }}
                />
                <Dropdown
                  id="theme-preview-dropdown"
                  titleText="Dropdown"
                  label="Choose an option"
                  items={['Option 1', 'Option 2', 'Option 3']}
                  style={{ marginBottom: '1rem' }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <Checkbox id="theme-preview-checkbox" labelText="Checkbox" />
                  <Toggle id="theme-preview-toggle" labelText="Toggle" />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <Slider
                    id="theme-preview-slider"
                    labelText="Slider"
                    max={100}
                    min={0}
                    value={sliderValue}
                    onChange={({ value }) => setSliderValue(value)}
                    step={1}
                  />
                </div>
                <ProgressIndicator
                  currentIndex={2}
                  spaceEqually
                  style={{ marginBottom: '1rem' }}
                >
                  <ProgressStep label="Step 1" />
                  <ProgressStep label="Step 2" />
                  <ProgressStep label="Step 3" />
                </ProgressIndicator>
                <Link href="#">Link example</Link>
              </Tile>
            </Column>
          </Grid>
        </div>
      </Column>
    </Grid>
  );
}
