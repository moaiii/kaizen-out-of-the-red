// @Flow

// TYPES

export type Endpoint = {
  path: string,
  verb: string,
  headers: Object,
  body: Object
}

// HELPER FUNCTIONS

export const appendAttribute = (url: string, key: string, value: string) => {
  return url.replace(`<${key}>`, value);
}