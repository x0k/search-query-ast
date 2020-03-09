import { normalizeString, normalizeTokens, tokenize, EXPRESSION, buildExpression } from '../src'
function prepareExpression (value) {
  return buildExpression(normalizeTokens(tokenize(normalizeString(value))))
}
describe('makeExpression', () => {
  describe('Normal', () => {
    describe('Basic', () => {
      it('Should make expression', () => {
        const result = prepareExpression('some value')
        const expected = {
          type: EXPRESSION.ITEM,
          position: 0,
          value: 'some value'
        }
        expect(result).toEqual(expected)
      })
      it('Should make expression 2', () => {
        const result = prepareExpression('NOT some value')
        const expected = {
          type: EXPRESSION.UNARY,
          position: 0,
          value: {
            operator: 'NOT',
            value: {
              type: EXPRESSION.ITEM,
              position: 4,
              value: 'some value'
            }
          }
        }
        expect(result).toEqual(expected)
      })
      it('Should make expression 3', () => {
        const result = prepareExpression('some value OR other value')
        const expected = {
          type: EXPRESSION.BINARY,
          position: 11,
          value: {
            operator: 'OR',
            left: {
              type: EXPRESSION.ITEM,
              position: 0,
              value: 'some value'
            },
            right: {
              type: EXPRESSION.ITEM,
              position: 14,
              value: 'other value'
            }
          }
        }
        expect(result).toEqual(expected)
      })
      it('Should make expression 4', () => {
        const result = prepareExpression(('(value in brackets)'))
        const expected = {
          type: EXPRESSION.GROUP,
          position: 0,
          value: {
            type: EXPRESSION.ITEM,
            position: 1,
            value: 'value in brackets'
          }
        }
        expect(result).toEqual(expected)
      })
      it('Should make expression 5', () => {
        const result = prepareExpression('(foo OR baz OR bar)')
        const expected = {
          type: EXPRESSION.GROUP,
          position: 0,
          value: {
            type: EXPRESSION.BINARY,
            position: 5,
            value: {
              operator: 'OR',
              left: {
                type: EXPRESSION.ITEM,
                position: 1,
                value: 'foo'
              },
              right: {
                type: EXPRESSION.BINARY,
                position: 12,
                value: {
                  operator: 'OR',
                  left: {
                    type: EXPRESSION.ITEM,
                    position: 8,
                    value: 'baz'
                  },
                  right: {
                    type: EXPRESSION.ITEM,
                    position: 15,
                    value: 'bar'
                  }
                }
              }
            }
          }
        }
        expect(result).toEqual(expected)
      })
    })
    describe('Groups', () => {
      it('Should make expression', () => {
        const result = prepareExpression('NOT some value AND other value')
        const expected = {
          type: EXPRESSION.BINARY,
          position: 15,
          value: {
            operator: 'AND',
            left: {
              type: EXPRESSION.UNARY,
              position: 0,
              value: {
                operator: 'NOT',
                value: {
                  type: EXPRESSION.ITEM,
                  position: 4,
                  value: 'some value'
                }
              }
            },
            right: {
              type: EXPRESSION.ITEM,
              position: 19,
              value: 'other value'
            }
          }
        }
        expect(result).toEqual(expected)
      })
      it('Should make expression 2', () => {
        const result = prepareExpression('(NOT some value AND foo) OR EXACT other value')
        const expected = {
          type: EXPRESSION.BINARY,
          position: 25,
          value: {
            operator: 'OR',
            left: {
              type: EXPRESSION.GROUP,
              position: 0,
              value: {
                type: EXPRESSION.BINARY,
                position: 16,
                value: {
                  operator: 'AND',
                  right: {
                    type: EXPRESSION.ITEM,
                    position: 20,
                    value: 'foo'
                  },
                  left: {
                    type: EXPRESSION.UNARY,
                    position: 1,
                    value: {
                      operator: 'NOT',
                      value: {
                        type: EXPRESSION.ITEM,
                        position: 5,
                        value: 'some value'
                      }
                    }
                  }
                }
              }
            },
            right: {
              type: EXPRESSION.UNARY,
              position: 28,
              value: {
                operator: 'EXACT',
                value: {
                  type: EXPRESSION.ITEM,
                  position: 34,
                  value: 'other value'
                }
              }
            }
          }
        }
        expect(result).toEqual(expected)
      })
    })
  })
  describe('Errors', () => {
  })
})
