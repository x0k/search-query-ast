import { TOKEN, tokenize, normalizeString, buildNormalizationMap, buildPositionRestorer, normalizeTokens } from '../src'
function makeTokens (definitions) {
  return definitions.map(([type, value, position]) => ({ type, value, position }))
}
describe('normalizeString', () => {
  it('Should replace trailing spaces', () => {
    const data = ' some value  '
    const result = normalizeString(data)
    expect(result).toBe('some value')
  })
  it('Should replace repeated spaces', () => {
    const data = 'some   other  value'
    const result = normalizeString(data)
    expect(result).toBe('some other value')
  })
})
describe('buildNormalizationMap', () => {
  it('Should build normalization map', () => {
    const result = buildNormalizationMap('some   other  value')
    const expected = [
      { index: 4, length: 3 },
      { index: 12, length: 2 }
    ]
    expect(result).toEqual(expected)
  })
  it('Should build normalization map 2', () => {
    const result = buildNormalizationMap('   some other  value')
    const expected = [
      { index: 0, length: 3 },
      { index: 13, length: 2 }
    ]
    expect(result).toEqual(expected)
  })
})
describe('recoverPosition', () => {
  it('Should recover position', () => {
    const map = buildNormalizationMap('some   other  value')
    const restorer = buildPositionRestorer(map)
    expect(restorer(11)).toBe(14)
    expect(restorer(7)).toBe(9)
  })
  it('Should recover position 2', () => {
    const map = buildNormalizationMap(' some other   value')
    const restorer = buildPositionRestorer(map)
    expect(restorer(0)).toBe(1)
    expect(restorer(13)).toBe(16)
  })
})
describe('normalizeTokens', () => {
  it('Should remove spaces tokens', () => {
    const data = tokenize('foo OR baz AND bar')
    const result = normalizeTokens(data)
    const expected = makeTokens([
      [TOKEN.ITEM, 'foo', 0],
      [TOKEN.BINARY_OPERATOR, 'OR', 4],
      [TOKEN.ITEM, 'baz', 7],
      [TOKEN.BINARY_OPERATOR, 'AND', 11],
      [TOKEN.ITEM, 'bar', 15]
    ])
    expect(result).toEqual(expected)
  })
  it('Must combine adjacent values', () => {
    const data = tokenize('some value OR other value')
    const result = normalizeTokens(data)
    const expected = makeTokens([
      [TOKEN.ITEM, 'some value', 0],
      [TOKEN.BINARY_OPERATOR, 'OR', 11],
      [TOKEN.ITEM, 'other value', 14]
    ])
    expect(result).toEqual(expected)
  })
})
