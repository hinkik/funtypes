import { KeyOf } from '..';
import show from '../show';

const StringObjectKeys = {
  foo: 1,
  bar: 2,
};

const NumbericObjectKeys = {
  2: 1,
  4: '2',
};

const MixedObjectKeys = {
  foo: 'bar',
  5: 1,
  '4': 3,
};

test('Numeric Object Keys', () => {
  expect(KeyOf('NumericKeys', NumbericObjectKeys).safeParse(2)).toMatchInlineSnapshot(`
    Object {
      "success": true,
      "value": 2,
    }
  `);
  expect(KeyOf('NumericKeys', NumbericObjectKeys).safeParse('2')).toMatchInlineSnapshot(`
    Object {
      "success": true,
      "value": "2",
    }
  `);
  expect(KeyOf('NumericKeys', NumbericObjectKeys).safeParse('foobar')).toMatchInlineSnapshot(`
    Object {
      "message": "Expected NumericKeys, but was \\"foobar\\"",
      "success": false,
    }
  `);
  expect(KeyOf('NumericKeys', NumbericObjectKeys).safeParse('5')).toMatchInlineSnapshot(`
    Object {
      "message": "Expected NumericKeys, but was \\"5\\"",
      "success": false,
    }
  `);
  const typed: keyof typeof NumbericObjectKeys = KeyOf('NumericKeys', NumbericObjectKeys).parse(2);

  expect(typed).toBe(2);

  expect(show(KeyOf('NumericKeys', NumbericObjectKeys))).toMatchInlineSnapshot(`"NumericKeys"`);
});

test('String Object Keys', () => {
  expect(KeyOf('StringKeys', StringObjectKeys).safeParse('foo')).toMatchInlineSnapshot(`
    Object {
      "success": true,
      "value": "foo",
    }
  `);
  expect(KeyOf('StringKeys', StringObjectKeys).safeParse(55)).toMatchInlineSnapshot(`
    Object {
      "message": "Expected StringKeys, but was 55",
      "success": false,
    }
  `);
  const typed: keyof typeof StringObjectKeys = KeyOf('StringKeys', StringObjectKeys).parse('bar');

  expect(typed).toBe('bar');

  expect(show(KeyOf('StringKeys', NumbericObjectKeys))).toMatchInlineSnapshot(`"StringKeys"`);
});

test('Mixed Object Keys', () => {
  expect(KeyOf('MixedKeys', MixedObjectKeys).safeParse('foo')).toMatchInlineSnapshot(`
    Object {
      "success": true,
      "value": "foo",
    }
  `);
  expect(KeyOf('MixedKeys', MixedObjectKeys).safeParse(5)).toMatchInlineSnapshot(`
    Object {
      "success": true,
      "value": 5,
    }
  `);
  expect(KeyOf('MixedKeys', MixedObjectKeys).safeParse('foobar')).toMatchInlineSnapshot(`
    Object {
      "message": "Expected MixedKeys, but was \\"foobar\\"",
      "success": false,
    }
  `);
  expect(KeyOf('MixedKeys', MixedObjectKeys).safeParse(4)).toMatchInlineSnapshot(`
    Object {
      "success": true,
      "value": 4,
    }
  `);
  const stringNumber: keyof typeof MixedObjectKeys = KeyOf('MixedKeys', MixedObjectKeys).parse('4');
  expect(stringNumber).toBe('4');

  const number: keyof typeof MixedObjectKeys = KeyOf('MixedKeys', MixedObjectKeys).parse(5);
  expect(number).toBe(5);

  expect(show(KeyOf('MixedKeys', MixedObjectKeys))).toMatchInlineSnapshot(`"MixedKeys"`);
});
