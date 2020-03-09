import { TOKEN } from '../token'
export const TOKEN_TITLES = {
  [TOKEN.UNARY_OPERATOR]: 'унарный оператор',
  [TOKEN.BINARY_OPERATOR]: 'бинарный оператор',
  [TOKEN.LEFT_BRACKET]: 'открывающая скобка',
  [TOKEN.RIGHT_BRACKET]: 'закрывающая скобка',
  [TOKEN.ITEM]: 'значение',
  [TOKEN.SPACE]: 'разделитель'
}
export const EXPRESSION = {
  ITEM: 'item',
  UNARY: 'unary',
  BINARY: 'binary',
  GROUP: 'group'
}
export const EXPRESSIONS = Object.keys(EXPRESSION)
