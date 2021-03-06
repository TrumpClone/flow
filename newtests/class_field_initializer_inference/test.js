/*
 * @flow
 * @lint-ignore-every LINEWRAP1
 */


import {suite, test} from '../../tsrc/test/Tester';

export default suite(({addFile, addFiles, addCode}) => [
  test('Uninitialized instance fields require annotation', [
    addCode('export class Foo { a; }')
      .newErrors(
        `
          test.js:3
            3: export class Foo { a; }
                                  ^^ property \`a\`. Missing annotation
        `,
      )
  ]),

  test('Annotated instance fields dont require annotation', [
    addCode('export class Foo { a: number; }')
      .noNewErrors()
  ]),

  test('Initialized instance fields infer type from init value', [
    addCode('export class Foo { a = 42; }')
      .noNewErrors()
  ]),

  test('Initialized instance fields require annotation within init values', [
    addCode('export class Foo { a = (p) => 42; }')
      .newErrors(
        `test.js:3\n` +
        `  3: export class Foo { a = (p) => 42; }\n` +
        `                             ^ parameter \`p\`. Missing annotation`,
      ),
    addCode('export class Bar { a = (p: number) => 42; }')
      .noNewErrors()
  ]),

]);
