export const TOKEN = {
  UNARY_OPERATOR: 'unary_operator',
  BINARY_OPERATOR: 'binary_operator',
  LEFT_BRACKET: 'left_bracket',
  RIGHT_BRACKET: 'right_bracket',
  SPACE: 'space',
  ITEM: 'item'
}
export const TOKENS = Object.values(TOKEN)
export const UNARY_OPERATOR = {
  NOT: 'NOT',
  EXACT: 'EXACT'
}
export const UNARY_OPERATORS = Object.values(UNARY_OPERATOR)
export const BINARY_OPERATOR = {
  OR: 'OR',
  AND: 'AND'
}
export const BINARY_OPERATORS = Object.values(BINARY_OPERATOR)
export const LEFT_BRACKET = '('
export const RIGHT_BRACKET = ')'
export const SPACE = ' '
export const SINGLE_CHAR_TOKENS = [TOKEN.LEFT_BRACKET, TOKEN.RIGHT_BRACKET, TOKEN.SPACE]
export const MULTI_CHAR_TOKENS = [TOKEN.UNARY_OPERATOR, TOKEN.BINARY_OPERATOR]
