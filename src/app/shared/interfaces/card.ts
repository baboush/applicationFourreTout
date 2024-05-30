/**
 * Interface representing a card with a title and an array of specifications.
 */
export interface Card {
  /**
   * The title of the card.
   */
  title: string;
  /**
   * An array of specifications associated with the card.
   * Each specification has a name (string) and a validity flag (boolean).
   */
  specs: {
    name: string;
    valid: boolean;
  }[];
}
