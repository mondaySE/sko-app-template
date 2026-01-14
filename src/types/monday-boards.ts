/**
 * Monday.com Board Type Definitions
 * 
 * This file defines typed interfaces for each board based on their column structure.
 * When adding new columns in monday.com:
 * 1. Add the column ID to the appropriate COLUMNS object
 * 2. Add the field to the typed interface
 * 3. Update the parse function to extract the new field
 */

// ============================================================================
// COLUMN ID CONSTANTS
// ============================================================================
// These map column IDs from monday.com to readable names.
// Update these when adding new columns in monday.com.

export const RESTAURANT_COLUMNS = {
  NAME: 'name',
  LOCATION: 'location_mkzkjwez',
  PHONE: 'phone_mkzkz9ba',
  TABLES: 'board_relation_mkzkc1a9',
} as const;

export const RESERVATION_COLUMNS = {
  NAME: 'name',
  CUSTOMER: 'board_relation_mkzkwtff',
  TABLE: 'board_relation_mkzkxb47',
  TABLE_TYPE: 'lookup_mkzkfjje',       // mirror column
  RESTAURANT: 'lookup_mkzk6stw',       // mirror column
  RES_START: 'date_mkzkwtnc',
  RES_END: 'date_mkzks26r',
  PEOPLE: 'numeric_mkzksevc',
} as const;

export const TABLE_COLUMNS = {
  NAME: 'name',
  RESTAURANTS: 'board_relation_mkzkaa4c',
  CAPACITY: 'numeric_mkzkz4qf',
  TYPE: 'color_mkzkxz4b',              // status column
} as const;

export const CUSTOMER_COLUMNS = {
  NAME: 'name',
  PHONE: 'phone_mkzkesqm',
  RESERVATIONS: 'board_relation_mkzkybkf',
} as const;

// ============================================================================
// TYPED INTERFACES
// ============================================================================
// These define the shape of parsed items for each board.

export interface LinkedItem {
  id: string;
  name: string;
}

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  phone: string;
  tables: LinkedItem[];
}

export interface Reservation {
  id: string;
  name: string;
  customer: LinkedItem | null;
  table: LinkedItem | null;
  tableType: string;       // mirror column (read-only)
  restaurant: string;      // mirror column (read-only)
  resStart: string;
  resEnd: string;
  people: number;
}

export interface Table {
  id: string;
  name: string;
  restaurants: LinkedItem[];
  capacity: number;
  type: string;            // status: Indoor, Outdoor, etc.
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  reservations: LinkedItem[];
}

// ============================================================================
// RAW ITEM TYPE (from monday.com API)
// ============================================================================

export interface RawColumnValue {
  id: string;
  text: string;
  value: string | null;
  linked_items?: LinkedItem[];
}

export interface RawBoardItem {
  id: string;
  name: string;
  column_values: RawColumnValue[];
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get a column value by ID from a raw item
 */
function getColumnValue(item: RawBoardItem, columnId: string): RawColumnValue | undefined {
  return item.column_values.find(col => col.id === columnId);
}

/**
 * Get text value from a column
 */
function getTextValue(item: RawBoardItem, columnId: string): string {
  return getColumnValue(item, columnId)?.text ?? '';
}

/**
 * Get number value from a column
 */
function getNumberValue(item: RawBoardItem, columnId: string): number {
  const text = getColumnValue(item, columnId)?.text ?? '';
  const num = parseFloat(text);
  return isNaN(num) ? 0 : num;
}

/**
 * Get first linked item from a board relation column
 */
function getLinkedItem(item: RawBoardItem, columnId: string): LinkedItem | null {
  const column = getColumnValue(item, columnId);
  return column?.linked_items?.[0] ?? null;
}

/**
 * Get all linked items from a board relation column
 */
function getAllLinkedItems(item: RawBoardItem, columnId: string): LinkedItem[] {
  const column = getColumnValue(item, columnId);
  return column?.linked_items ?? [];
}

// ============================================================================
// PARSE FUNCTIONS
// ============================================================================
// These convert raw monday.com items to typed objects.

export function parseRestaurant(item: RawBoardItem): Restaurant {
  return {
    id: item.id,
    name: item.name,
    location: getTextValue(item, RESTAURANT_COLUMNS.LOCATION),
    phone: getTextValue(item, RESTAURANT_COLUMNS.PHONE),
    tables: getAllLinkedItems(item, RESTAURANT_COLUMNS.TABLES),
  };
}

export function parseReservation(item: RawBoardItem): Reservation {
  return {
    id: item.id,
    name: item.name,
    customer: getLinkedItem(item, RESERVATION_COLUMNS.CUSTOMER),
    table: getLinkedItem(item, RESERVATION_COLUMNS.TABLE),
    tableType: getTextValue(item, RESERVATION_COLUMNS.TABLE_TYPE),
    restaurant: getTextValue(item, RESERVATION_COLUMNS.RESTAURANT),
    resStart: getTextValue(item, RESERVATION_COLUMNS.RES_START),
    resEnd: getTextValue(item, RESERVATION_COLUMNS.RES_END),
    people: getNumberValue(item, RESERVATION_COLUMNS.PEOPLE),
  };
}

export function parseTable(item: RawBoardItem): Table {
  return {
    id: item.id,
    name: item.name,
    restaurants: getAllLinkedItems(item, TABLE_COLUMNS.RESTAURANTS),
    capacity: getNumberValue(item, TABLE_COLUMNS.CAPACITY),
    type: getTextValue(item, TABLE_COLUMNS.TYPE),
  };
}

export function parseCustomer(item: RawBoardItem): Customer {
  return {
    id: item.id,
    name: item.name,
    phone: getTextValue(item, CUSTOMER_COLUMNS.PHONE),
    reservations: getAllLinkedItems(item, CUSTOMER_COLUMNS.RESERVATIONS),
  };
}

// ============================================================================
// BATCH PARSE FUNCTIONS
// ============================================================================
// Convenience functions to parse arrays of items.

export function parseRestaurants(items: RawBoardItem[]): Restaurant[] {
  return items.map(parseRestaurant);
}

export function parseReservations(items: RawBoardItem[]): Reservation[] {
  return items.map(parseReservation);
}

export function parseTables(items: RawBoardItem[]): Table[] {
  return items.map(parseTable);
}

export function parseCustomers(items: RawBoardItem[]): Customer[] {
  return items.map(parseCustomer);
}
