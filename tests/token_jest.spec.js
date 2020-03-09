import { TOKEN, tokenize } from '../src'
function makeTokens (definitions) {
  return definitions.map(([type, value, position]) => ({ type, value, position }))
}
describe('tokenize', () => {
  it('Should return tokens', () => {
    const data = 'some value'
    const result = tokenize(data)
    const expected = makeTokens([[TOKEN.ITEM, 'some', 0], [TOKEN.SPACE, ' ', 4], [TOKEN.ITEM, 'value', 5]])
    expect(result).toEqual(expected)
  })
  it('Should return tokens 2', () => {
    const data = 'val1 AND val2 OR (val 3 AND NOT val4 OR EXACT val5)'
    const result = tokenize(data)
    const expected = makeTokens([
      [TOKEN.ITEM, 'val1', 0],
      [TOKEN.SPACE, ' ', 4],
      [TOKEN.BINARY_OPERATOR, 'AND', 5],
      [TOKEN.SPACE, ' ', 8],
      [TOKEN.ITEM, 'val2', 9],
      [TOKEN.SPACE, ' ', 13],
      [TOKEN.BINARY_OPERATOR, 'OR', 14],
      [TOKEN.SPACE, ' ', 16],
      [TOKEN.LEFT_BRACKET, '(', 17],
      [TOKEN.ITEM, 'val', 18],
      [TOKEN.SPACE, ' ', 21],
      [TOKEN.ITEM, '3', 22],
      [TOKEN.SPACE, ' ', 23],
      [TOKEN.BINARY_OPERATOR, 'AND', 24],
      [TOKEN.SPACE, ' ', 27],
      [TOKEN.UNARY_OPERATOR, 'NOT', 28],
      [TOKEN.SPACE, ' ', 31],
      [TOKEN.ITEM, 'val4', 32],
      [TOKEN.SPACE, ' ', 36],
      [TOKEN.BINARY_OPERATOR, 'OR', 37],
      [TOKEN.SPACE, ' ', 39],
      [TOKEN.UNARY_OPERATOR, 'EXACT', 40],
      [TOKEN.SPACE, ' ', 45],
      [TOKEN.ITEM, 'val5', 46],
      [TOKEN.RIGHT_BRACKET, ')', 50]
    ])
    expect(result).toEqual(expected)
  })
})
