'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  Grid,
  Column,
  Heading,
  Search,
  Dropdown,
  MultiSelect,
  Button,
  DismissibleTag,
} from '@carbon/react';
import { ArrowUp, ArrowDown, ArrowsVertical } from '@carbon/icons-react';

type Region = 'North' | 'South' | 'East' | 'West';
type AgeGroup = '18-24' | '25-34' | '35-44' | '45-54' | '55+';
type IncomeBracket = 'Low' | 'Medium' | 'High';

type DemographicRecord = {
  id: string;
  name: string;
  region: Region;
  ageGroup: AgeGroup;
  incomeBracket: IncomeBracket;
};

const SAMPLE_RECORDS: DemographicRecord[] = [
  { id: 'P001', name: 'Alex Chen', region: 'North', ageGroup: '25-34', incomeBracket: 'Medium' },
  { id: 'P002', name: 'Jordan Blake', region: 'South', ageGroup: '35-44', incomeBracket: 'High' },
  { id: 'P003', name: 'Sam Rivera', region: 'East', ageGroup: '18-24', incomeBracket: 'Low' },
  { id: 'P004', name: 'Taylor Morgan', region: 'West', ageGroup: '45-54', incomeBracket: 'Medium' },
  { id: 'P005', name: 'Casey Kim', region: 'North', ageGroup: '25-34', incomeBracket: 'High' },
  { id: 'P006', name: 'Riley Johnson', region: 'South', ageGroup: '55+', incomeBracket: 'Medium' },
  { id: 'P007', name: 'Avery Williams', region: 'East', ageGroup: '18-24', incomeBracket: 'Low' },
  { id: 'P008', name: 'Quinn Davis', region: 'West', ageGroup: '35-44', incomeBracket: 'High' },
  { id: 'P009', name: 'Morgan Lee', region: 'North', ageGroup: '45-54', incomeBracket: 'Medium' },
  { id: 'P010', name: 'Jamie Martinez', region: 'South', ageGroup: '25-34', incomeBracket: 'Low' },
  { id: 'P011', name: 'Drew Thompson', region: 'East', ageGroup: '55+', incomeBracket: 'High' },
  { id: 'P012', name: 'Jordan Smith', region: 'West', ageGroup: '18-24', incomeBracket: 'Medium' },
  { id: 'P013', name: 'Alex Brown', region: 'North', ageGroup: '35-44', incomeBracket: 'Low' },
  { id: 'P014', name: 'Sam Wilson', region: 'South', ageGroup: '45-54', incomeBracket: 'High' },
  { id: 'P015', name: 'Cameron Garcia', region: 'East', ageGroup: '25-34', incomeBracket: 'Medium' },
  { id: 'P016', name: 'Taylor Anderson', region: 'West', ageGroup: '55+', incomeBracket: 'Low' },
  { id: 'P017', name: 'Riley Thomas', region: 'North', ageGroup: '18-24', incomeBracket: 'High' },
  { id: 'P018', name: 'Avery Jackson', region: 'South', ageGroup: '35-44', incomeBracket: 'Medium' },
  { id: 'P019', name: 'Nora Patel', region: 'North', ageGroup: '25-34', incomeBracket: 'High' },
  { id: 'P020', name: 'Eli Nakamura', region: 'East', ageGroup: '45-54', incomeBracket: 'Low' },
  { id: 'P021', name: 'Skyler Reeves', region: 'West', ageGroup: '18-24', incomeBracket: 'Medium' },
  { id: 'P022', name: 'Harper Collins', region: 'South', ageGroup: '35-44', incomeBracket: 'High' },
  { id: 'P023', name: 'Kai Fernandez', region: 'North', ageGroup: '55+', incomeBracket: 'Low' },
  { id: 'P024', name: 'Rowan Mitchell', region: 'East', ageGroup: '25-34', incomeBracket: 'Medium' },
  { id: 'P025', name: 'Sage Cooper', region: 'West', ageGroup: '45-54', incomeBracket: 'High' },
  { id: 'P026', name: 'Finley Brooks', region: 'South', ageGroup: '18-24', incomeBracket: 'Low' },
  { id: 'P027', name: 'Dakota Wells', region: 'North', ageGroup: '35-44', incomeBracket: 'Medium' },
  { id: 'P028', name: 'Emery Nguyen', region: 'East', ageGroup: '55+', incomeBracket: 'High' },
  { id: 'P029', name: 'Phoenix Carter', region: 'West', ageGroup: '25-34', incomeBracket: 'Low' },
  { id: 'P030', name: 'Lennox Hayes', region: 'South', ageGroup: '45-54', incomeBracket: 'Medium' },
  { id: 'P031', name: 'Charlie Ortiz', region: 'North', ageGroup: '18-24', incomeBracket: 'High' },
  { id: 'P032', name: 'Arden Shaw', region: 'East', ageGroup: '35-44', incomeBracket: 'Low' },
  { id: 'P033', name: 'Remy Larson', region: 'West', ageGroup: '55+', incomeBracket: 'Medium' },
  { id: 'P034', name: 'Blair Sullivan', region: 'South', ageGroup: '25-34', incomeBracket: 'High' },
  { id: 'P035', name: 'Harley Dunn', region: 'North', ageGroup: '45-54', incomeBracket: 'Low' },
  { id: 'P036', name: 'Jules Carpenter', region: 'East', ageGroup: '18-24', incomeBracket: 'Medium' },
  { id: 'P037', name: 'Milan Torres', region: 'West', ageGroup: '35-44', incomeBracket: 'High' },
  { id: 'P038', name: 'Reese Hamilton', region: 'South', ageGroup: '55+', incomeBracket: 'Low' },
  { id: 'P039', name: 'Oakley Grant', region: 'North', ageGroup: '25-34', incomeBracket: 'Medium' },
  { id: 'P040', name: 'Eden Fox', region: 'East', ageGroup: '45-54', incomeBracket: 'High' },
  { id: 'P041', name: 'Marlowe Perry', region: 'West', ageGroup: '18-24', incomeBracket: 'Low' },
  { id: 'P042', name: 'Kendall Moreno', region: 'South', ageGroup: '35-44', incomeBracket: 'Medium' },
  { id: 'P043', name: 'Rio Sandoval', region: 'North', ageGroup: '55+', incomeBracket: 'High' },
  { id: 'P044', name: 'Tatum Price', region: 'East', ageGroup: '25-34', incomeBracket: 'Low' },
  { id: 'P045', name: 'Shiloh Barrett', region: 'West', ageGroup: '45-54', incomeBracket: 'Medium' },
  { id: 'P046', name: 'Ellis Manning', region: 'South', ageGroup: '18-24', incomeBracket: 'High' },
  { id: 'P047', name: 'Sutton Reid', region: 'North', ageGroup: '35-44', incomeBracket: 'Low' },
  { id: 'P048', name: 'Wren Douglas', region: 'East', ageGroup: '55+', incomeBracket: 'Medium' },
  { id: 'P049', name: 'Lane Crawford', region: 'West', ageGroup: '25-34', incomeBracket: 'High' },
  { id: 'P050', name: 'Briar Holt', region: 'South', ageGroup: '45-54', incomeBracket: 'Low' },
  { id: 'P051', name: 'Soren Kelley', region: 'North', ageGroup: '18-24', incomeBracket: 'Medium' },
  { id: 'P052', name: 'Haven Soto', region: 'East', ageGroup: '35-44', incomeBracket: 'High' },
  { id: 'P053', name: 'Lark Jensen', region: 'West', ageGroup: '55+', incomeBracket: 'Low' },
  { id: 'P054', name: 'Baylor Hunt', region: 'South', ageGroup: '25-34', incomeBracket: 'Medium' },
  { id: 'P055', name: 'Indie Ramirez', region: 'North', ageGroup: '45-54', incomeBracket: 'High' },
  { id: 'P056', name: 'Hollis Warren', region: 'East', ageGroup: '18-24', incomeBracket: 'Low' },
  { id: 'P057', name: 'Perry Fleming', region: 'West', ageGroup: '35-44', incomeBracket: 'Medium' },
  { id: 'P058', name: 'Zion Black', region: 'South', ageGroup: '55+', incomeBracket: 'High' },
  { id: 'P059', name: 'Adair Lowe', region: 'North', ageGroup: '25-34', incomeBracket: 'Low' },
  { id: 'P060', name: 'Keegan Marsh', region: 'East', ageGroup: '45-54', incomeBracket: 'Medium' },
  { id: 'P061', name: 'Darcy Stone', region: 'West', ageGroup: '18-24', incomeBracket: 'High' },
  { id: 'P062', name: 'Frankie Booth', region: 'South', ageGroup: '35-44', incomeBracket: 'Low' },
  { id: 'P063', name: 'Scout Palmer', region: 'North', ageGroup: '55+', incomeBracket: 'Medium' },
  { id: 'P064', name: 'Campbell York', region: 'East', ageGroup: '25-34', incomeBracket: 'High' },
  { id: 'P065', name: 'Marley Duffy', region: 'West', ageGroup: '45-54', incomeBracket: 'Low' },
  { id: 'P066', name: 'Nico Vaughn', region: 'South', ageGroup: '18-24', incomeBracket: 'Medium' },
  { id: 'P067', name: 'Lennon Cross', region: 'North', ageGroup: '35-44', incomeBracket: 'High' },
  { id: 'P068', name: 'Winter Hess', region: 'East', ageGroup: '55+', incomeBracket: 'Low' },
  { id: 'P069', name: 'Cypress Rollins', region: 'West', ageGroup: '25-34', incomeBracket: 'Medium' },
  { id: 'P070', name: 'Bellamy Tate', region: 'South', ageGroup: '45-54', incomeBracket: 'High' },
  { id: 'P071', name: 'Kieran Frost', region: 'North', ageGroup: '18-24', incomeBracket: 'Low' },
  { id: 'P072', name: 'Ansel Burke', region: 'East', ageGroup: '35-44', incomeBracket: 'Medium' },
  { id: 'P073', name: 'Salem Wyatt', region: 'West', ageGroup: '55+', incomeBracket: 'High' },
  { id: 'P074', name: 'Teagan Roth', region: 'South', ageGroup: '25-34', incomeBracket: 'Low' },
  { id: 'P075', name: 'Cove Shepherd', region: 'North', ageGroup: '45-54', incomeBracket: 'Medium' },
  { id: 'P076', name: 'Ocean Ballard', region: 'East', ageGroup: '18-24', incomeBracket: 'High' },
  { id: 'P077', name: 'Story Mack', region: 'West', ageGroup: '35-44', incomeBracket: 'Low' },
  { id: 'P078', name: 'Jessie Harmon', region: 'South', ageGroup: '55+', incomeBracket: 'Medium' },
  { id: 'P079', name: 'True Gallagher', region: 'North', ageGroup: '25-34', incomeBracket: 'High' },
  { id: 'P080', name: 'Ever Proctor', region: 'East', ageGroup: '45-54', incomeBracket: 'Low' },
  { id: 'P081', name: 'Kit Whitfield', region: 'West', ageGroup: '18-24', incomeBracket: 'Medium' },
  { id: 'P082', name: 'Lake Merritt', region: 'South', ageGroup: '35-44', incomeBracket: 'High' },
  { id: 'P083', name: 'Arbor Hensley', region: 'North', ageGroup: '55+', incomeBracket: 'Low' },
  { id: 'P084', name: 'Lyric Espinoza', region: 'East', ageGroup: '25-34', incomeBracket: 'Medium' },
  { id: 'P085', name: 'Brecken Floyd', region: 'West', ageGroup: '45-54', incomeBracket: 'High' },
  { id: 'P086', name: 'Jude Odom', region: 'South', ageGroup: '18-24', incomeBracket: 'Low' },
  { id: 'P087', name: 'Ripley Cantu', region: 'North', ageGroup: '35-44', incomeBracket: 'Medium' },
  { id: 'P088', name: 'Hart Lindsey', region: 'East', ageGroup: '55+', incomeBracket: 'High' },
  { id: 'P089', name: 'Ira Montoya', region: 'West', ageGroup: '25-34', incomeBracket: 'Low' },
  { id: 'P090', name: 'Sloane Pruitt', region: 'South', ageGroup: '45-54', incomeBracket: 'Medium' },
  { id: 'P091', name: 'Valor Cline', region: 'North', ageGroup: '18-24', incomeBracket: 'High' },
  { id: 'P092', name: 'Greer Rocha', region: 'East', ageGroup: '35-44', incomeBracket: 'Low' },
  { id: 'P093', name: 'Royal Coffey', region: 'West', ageGroup: '55+', incomeBracket: 'Medium' },
  { id: 'P094', name: 'Landry Gibbs', region: 'South', ageGroup: '25-34', incomeBracket: 'High' },
  { id: 'P095', name: 'Ellery Combs', region: 'North', ageGroup: '45-54', incomeBracket: 'Low' },
  { id: 'P096', name: 'Brynn Osborn', region: 'East', ageGroup: '18-24', incomeBracket: 'Medium' },
  { id: 'P097', name: 'Stellan Gill', region: 'West', ageGroup: '35-44', incomeBracket: 'High' },
  { id: 'P098', name: 'Tate Underwood', region: 'South', ageGroup: '55+', incomeBracket: 'Low' },
  { id: 'P099', name: 'Auden Farrell', region: 'North', ageGroup: '25-34', incomeBracket: 'Medium' },
  { id: 'P100', name: 'Crew Buchanan', region: 'East', ageGroup: '45-54', incomeBracket: 'High' },
  { id: 'P101', name: 'Vesper Crane', region: 'West', ageGroup: '18-24', incomeBracket: 'Low' },
  { id: 'P102', name: 'Banks Malone', region: 'South', ageGroup: '35-44', incomeBracket: 'Medium' },
  { id: 'P103', name: 'Prairie Norris', region: 'North', ageGroup: '55+', incomeBracket: 'High' },
  { id: 'P104', name: 'Calloway Stein', region: 'East', ageGroup: '25-34', incomeBracket: 'Low' },
  { id: 'P105', name: 'Wynn Barton', region: 'West', ageGroup: '45-54', incomeBracket: 'Medium' },
  { id: 'P106', name: 'Mercer Hodge', region: 'South', ageGroup: '18-24', incomeBracket: 'High' },
  { id: 'P107', name: 'Carver Ibarra', region: 'North', ageGroup: '35-44', incomeBracket: 'Low' },
  { id: 'P108', name: 'Blythe Kemp', region: 'East', ageGroup: '55+', incomeBracket: 'Medium' },
  { id: 'P109', name: 'Remington Howell', region: 'West', ageGroup: '25-34', incomeBracket: 'High' },
  { id: 'P110', name: 'Sawyer Poole', region: 'South', ageGroup: '45-54', incomeBracket: 'Low' },
  { id: 'P111', name: 'Marigold Sexton', region: 'North', ageGroup: '18-24', incomeBracket: 'Medium' },
  { id: 'P112', name: 'Heath Acosta', region: 'East', ageGroup: '35-44', incomeBracket: 'High' },
  { id: 'P113', name: 'Piper Dotson', region: 'West', ageGroup: '55+', incomeBracket: 'Low' },
  { id: 'P114', name: 'Archer Leach', region: 'South', ageGroup: '25-34', incomeBracket: 'Medium' },
  { id: 'P115', name: 'Clover Truong', region: 'North', ageGroup: '45-54', incomeBracket: 'High' },
  { id: 'P116', name: 'Reef Hubbard', region: 'East', ageGroup: '18-24', incomeBracket: 'Low' },
  { id: 'P117', name: 'Devin Vega', region: 'West', ageGroup: '35-44', incomeBracket: 'Medium' },
  { id: 'P118', name: 'Fallon Jarvis', region: 'South', ageGroup: '55+', incomeBracket: 'High' },
];

const REGION_ITEMS = [
  { id: 'North', label: 'North' },
  { id: 'South', label: 'South' },
  { id: 'East', label: 'East' },
  { id: 'West', label: 'West' },
];

const AGE_GROUP_ITEMS = [
  { id: '18-24', label: '18-24' },
  { id: '25-34', label: '25-34' },
  { id: '35-44', label: '35-44' },
  { id: '45-54', label: '45-54' },
  { id: '55+', label: '55+' },
];

const INCOME_ITEMS = [
  { id: 'Low', label: 'Low' },
  { id: 'Medium', label: 'Medium' },
  { id: 'High', label: 'High' },
];

function itemToString(item: { id: string; label: string } | null): string {
  return item?.label ?? '';
}

type SortKey = keyof DemographicRecord;
type SortDir = 'asc' | 'desc' | 'none';

const COLUMNS: { key: SortKey; label: string; lg: number; md: number; sm: number }[] = [
  { key: 'id', label: 'ID', lg: 2, md: 1, sm: 1 },
  { key: 'name', label: 'Name', lg: 4, md: 2, sm: 1 },
  { key: 'region', label: 'Region', lg: 3, md: 2, sm: 1 },
  { key: 'ageGroup', label: 'Age group', lg: 3, md: 1, sm: 1 },
  { key: 'incomeBracket', label: 'Income', lg: 4, md: 2, sm: 0 },
];

export default function DemographicsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState<{ id: string; label: string } | null>(null);
  const [ageGroup, setAgeGroup] = useState<{ id: string; label: string } | null>(null);
  const [incomeItems, setIncomeItems] = useState<{ id: string; label: string }[]>([]);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('none');

  const handleSort = useCallback((key: SortKey) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir('asc');
    } else if (sortDir === 'asc') {
      setSortDir('desc');
    } else {
      setSortKey(null);
      setSortDir('none');
    }
  }, [sortKey, sortDir]);

  const filteredRecords = useMemo(() => {
    const filtered = SAMPLE_RECORDS.filter((record) => {
      const matchesSearch =
        !searchQuery.trim() ||
        record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = !region || record.region === region.id;
      const matchesAge = !ageGroup || record.ageGroup === ageGroup.id;
      const matchesIncome =
        incomeItems.length === 0 ||
        incomeItems.some((item) => record.incomeBracket === item.id);
      return matchesSearch && matchesRegion && matchesAge && matchesIncome;
    });
    if (!sortKey || sortDir === 'none') return filtered;
    const dir = sortDir === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      return aVal < bVal ? -dir : aVal > bVal ? dir : 0;
    });
  }, [searchQuery, region, ageGroup, incomeItems, sortKey, sortDir]);

  const hasActiveFilters =
    searchQuery.trim() || region || ageGroup || incomeItems.length > 0;

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setRegion(null);
    setAgeGroup(null);
    setIncomeItems([]);
  }, []);

  const removeTag = useCallback(
    (type: 'search' | 'region' | 'age' | 'income', value?: string) => {
      if (type === 'search') setSearchQuery('');
      if (type === 'region') setRegion(null);
      if (type === 'age') setAgeGroup(null);
      if (type === 'income') {
        if (value) {
          setIncomeItems((prev) => prev.filter((i) => i.id !== value));
        } else {
          setIncomeItems([]);
        }
      }
    },
    []
  );

  return (
    <Grid fullWidth className="main-content-grid">
      <Column lg={16} md={8} sm={4}>
        <Heading className="page-heading">Demographics</Heading>
        <p style={{ marginBottom: '1.5rem' }}>
          Search and filter participant demographics. Use the search bar to find
          by name or ID, and apply filters to narrow results.
        </p>

        <Grid fullWidth narrow className="demographics-filter-toolbar" style={{ marginBottom: '1rem' }}>
          <Column lg={4} md={4} sm={4}>
            <Search
              id="demographics-search"
              labelText="Search"
              placeholder="Search by name or ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-field"
            />
          </Column>
          <Column lg={4} md={4} sm={4}>
            <Dropdown
              id="demographics-region"
              titleText="Region"
              label="Region"
              items={REGION_ITEMS}
              itemToString={itemToString}
              selectedItem={region}
              onChange={({ selectedItem }) => setRegion(selectedItem ?? null)}
              className="form-field"
            />
          </Column>
          <Column lg={4} md={4} sm={4}>
            <Dropdown
              id="demographics-age"
              titleText="Age group"
              label="Age group"
              items={AGE_GROUP_ITEMS}
              itemToString={itemToString}
              selectedItem={ageGroup}
              onChange={({ selectedItem }) => setAgeGroup(selectedItem ?? null)}
              className="form-field"
            />
          </Column>
          <Column lg={4} md={4} sm={4}>
            <MultiSelect
              id="demographics-income"
              titleText="Income bracket"
              label="Income bracket"
              items={INCOME_ITEMS}
              itemToString={itemToString}
              selectedItems={incomeItems}
              onChange={({ selectedItems }) =>
                setIncomeItems(
                  (selectedItems ?? []).filter(
                    (i): i is { id: string; label: string } => i != null
                  )
                )
              }
              className="form-field"
            />
          </Column>
        </Grid>

        {hasActiveFilters && (
          <div style={{ marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
            {searchQuery.trim() && (
              <DismissibleTag
                text={`Search: ${searchQuery}`}
                onClose={() => removeTag('search')}
              />
            )}
            {region && (
              <DismissibleTag
                text={`Region: ${region.label}`}
                onClose={() => removeTag('region')}
              />
            )}
            {ageGroup && (
              <DismissibleTag
                text={`Age: ${ageGroup.label}`}
                onClose={() => removeTag('age')}
              />
            )}
            {incomeItems.map((item) => (
              <DismissibleTag
                key={item.id}
                text={`Income: ${item.label}`}
                onClose={() => removeTag('income', item.id)}
              />
            ))}
            <Button kind="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        )}

        <p style={{ marginBottom: '0.75rem', fontSize: '0.875rem' }}>
          Showing {filteredRecords.length} of {SAMPLE_RECORDS.length} participants
        </p>

        <div className="demographics-table">
          <Grid fullWidth narrow className="demographics-table-header">
            {COLUMNS.map((col) => (
              <Column key={col.key} lg={col.lg} md={col.md} sm={col.sm}>
                <button
                  type="button"
                  className="demographics-sort-btn"
                  onClick={() => handleSort(col.key)}
                  aria-label={`Sort by ${col.label}`}
                >
                  {col.label}
                  {sortKey === col.key && sortDir === 'asc' && <ArrowUp size={14} />}
                  {sortKey === col.key && sortDir === 'desc' && <ArrowDown size={14} />}
                  {sortKey !== col.key && <ArrowsVertical size={14} />}
                </button>
              </Column>
            ))}
          </Grid>
          {filteredRecords.length === 0 ? (
            <p style={{ padding: '1rem 0', fontSize: '0.875rem' }}>
              No results match your filters. Try adjusting your search or filters.
            </p>
          ) : (
            filteredRecords.map((record) => (
              <Grid
                fullWidth
                narrow
                key={record.id}
                className="demographics-table-row"
              >
                {COLUMNS.map((col) => (
                  <Column key={col.key} lg={col.lg} md={col.md} sm={col.sm}>
                    {record[col.key]}
                  </Column>
                ))}
              </Grid>
            ))
          )}
        </div>
      </Column>
    </Grid>
  );
}
