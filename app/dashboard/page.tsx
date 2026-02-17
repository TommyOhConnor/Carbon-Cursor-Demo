'use client';

import { useState } from 'react';
import {
  Grid,
  Column,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Dropdown,
  Button,
  Tile,
} from '@carbon/react';

const dropdownItems = [
  { id: 'opt-1', label: 'Option 1' },
  { id: 'opt-2', label: 'Option 2' },
  { id: 'opt-3', label: 'Option 3' },
];

export default function DashboardPage() {
  const [selectedItem, setSelectedItem] = useState(dropdownItems[0]);

  return (
    <Grid fullWidth className="main-content-grid">
      <Column lg={16} md={8} sm={4}>
        <Heading className="page-heading">Dashboard</Heading>
        <p style={{ marginBottom: '1.5rem' }}>
          A second prototype page using Carbon Tabs, Dropdown, Tiles, and
          buttons.
        </p>

        <Dropdown
          id="dashboard-dropdown"
          titleText="Choose an option"
          label="Choose an option"
          items={dropdownItems}
          selectedItem={selectedItem}
          itemToString={(item) => (item ? item.label : '')}
          onChange={({ selectedItem: item }) => item && setSelectedItem(item)}
          style={{ marginBottom: '2rem', maxWidth: '16rem' }}
        />

        <Tabs>
          <TabList aria-label="Dashboard tabs">
            <Tab>Overview</Tab>
            <Tab>Activity</Tab>
            <Tab>Settings</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Grid fullWidth narrow>
                <Column lg={4} md={4} sm={4}>
                  <Tile>
                    <Heading type="productive" className="tile-heading">
                      Card one
                    </Heading>
                    <p>Sample content for the overview tab.</p>
                    <Button size="sm" kind="tertiary">
                      View
                    </Button>
                  </Tile>
                </Column>
                <Column lg={4} md={4} sm={4}>
                  <Tile>
                    <Heading type="productive" className="tile-heading">
                      Card two
                    </Heading>
                    <p>More prototype content here.</p>
                    <Button size="sm" kind="tertiary">
                      View
                    </Button>
                  </Tile>
                </Column>
                <Column lg={4} md={4} sm={4}>
                  <Tile>
                    <Heading type="productive" className="tile-heading">
                      Card three
                    </Heading>
                    <p>Interactive tiles with Carbon styling.</p>
                    <Button size="sm" kind="tertiary">
                      View
                    </Button>
                  </Tile>
                </Column>
              </Grid>
            </TabPanel>
            <TabPanel>
              <Tile>
                <Heading type="productive" className="tile-heading">
                  Activity
                </Heading>
                <p>Activity feed or list would go here. This tab confirms navigation works.</p>
              </Tile>
            </TabPanel>
            <TabPanel>
              <Tile>
                <Heading type="productive" className="tile-heading">
                  Settings
                </Heading>
                <p>Settings form or options could be built with Carbon form components.</p>
              </Tile>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Column>
    </Grid>
  );
}
