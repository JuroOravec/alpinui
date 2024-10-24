/**
 * Generate Python type hints for Alpinui components like below:
 * 
 * ```python
 * class ADividerSlots(TypedDict):
 *     default: NotRequired[SlotContent]
 * 
 * class ADividerJsProps(TypedDict):
 *     color: NotRequired[JS]
 *     inset: NotRequired[JS]
 *     length: NotRequired[JS]
 *     opacity: NotRequired[JS]
 *     thickness: NotRequired[JS]
 *     vertical: NotRequired[JS]
 *     klass: NotRequired[JS]  # Mapped from 'class'
 *     style: NotRequired[JS]
 *     theme: NotRequired[JS]
 * 
 * class ADividerProps(TypedDict):
 *     color: NotRequired[Union[str]]
 *     inset: NotRequired[Union[bool]]
 *     length: NotRequired[Union[int, float, str]]
 *     opacity: NotRequired[Union[int, float, str]]
 *     thickness: NotRequired[Union[int, float, str]]
 *     vertical: NotRequired[Union[bool]]
 *     klass: NotRequired[Union[str]]  # Mapped from 'class'
 *     style: NotRequired[Union[str]]
 *     theme: NotRequired[Union[str]]
 *
 *     attrs: NotRequired[Dict]
 *     js: NotRequired[ADividerJsProps]
 * 
 * ADivider = Component[EmptyTuple, ADividerProps, ADividerSlots, Any, Any, Any]
 * ```
 */

const ts = require('typescript');
const path = require('path');
const fs = require('fs');
const glob = require('glob');

const { components } = require('../dist/alpinui-labs')

// /////////////////////////////
// EXTRACTNG PROPS / SLOTS
// /////////////////////////////

const jsToPyTypes = new Map<any, string[]>([
  [Boolean, ["bool"]],
  [String, ["str"]],
  [Function, []],
  [Object, ["Dict"]],
  [Array, ["List"]],
  [Number, ["int", "float"]],
  [undefined, ["Any"]],
  [null, ["Any"]],
]);

const mappedKeys = {
  class: 'klass',
};

// See comments for https://stackoverflow.com/a/54246501/9788634
const camelToSnake = (str: string) => {
  const firstLetter = str[0].toLowerCase();
  const rest = str.slice(1, str.length).replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`);
  return firstLetter + rest;
};

const applyRequired = (type: any, required: boolean) => required ? type : `NotRequired[${type}]`;
const applyOptional = (type: any, required: boolean) => required ? type : `Optional[${type}] = None`;

const indent = (text: string, tabs: number = 1) => '    '.repeat(tabs) + text;

const generate = () => {
  const typesScriptBody = Object.entries(components)
    .flatMap(([compName, comp]: any) => {
      const propsData = Object.entries(comp.props)
        .filter(([propName, prop]) => !propName.startsWith('_'))
        .map(([propName, prop]: any) => {
          const origName = propName;
          const mappedName = mappedKeys[propName as keyof typeof mappedKeys] ?? propName;
          const types = [...new Set((Array.isArray(prop.type)
            ? prop.type
            : [prop.type]).flatMap((t: any) => jsToPyTypes.get(t)))];

          return {
            pyName: camelToSnake(mappedName).replace(/:/g, "_"),
            types,
            required: prop.required,
            origName,
          }
      });

      const propsName = `${compName}Props`;
      const jsPropsName = `${compName}JsProps`;
      const slotsName = `${compName}Slots`;

      propsData.push(
        {pyName: 'attrs', types: ['Dict'], required: false, origName: 'attrs'},
        {pyName: 'js', types: [jsPropsName], required: false, origName: 'js'},
      );

      const jsPropsBody = [
        ...propsData,
        // This adds a way to spread props in JS
        { pyName: 'spread', origName: 'spread' },
      ]
        // NOTE: These props are available for python props but not JS props
        .filter(({ pyName }) => !['attrs', 'js', 'tag'].includes(pyName))
        .map(({ pyName, origName }) => {
          const comment = pyName === origName
            ? ""
            : `  # Mapped from '${origName}'`;
          const type = applyRequired('JS', false);
          
          return indent(`${pyName}: ${type}${comment}`, 1)
        })
        .join('\n');

      const jsPropsScript = [
        `class ${jsPropsName}(TypedDict):`,
        jsPropsBody || indent('pass', 1)
      ].join('\n');

      const propsBody = propsData
        .map(({ pyName, types, required, origName }) => {
          if (types.length === 0) return null;

          const comment = pyName === origName
            ? ""
            : `  # Mapped from '${origName}'`;

          let type = types.length > 1 ? `Union[${types.join(', ')}]` : types[0];
          type = `Annotated[${type}, PropMeta(required=${required ? 'True' : 'False'})]`;
          type = applyRequired(type, false);

          return indent(`${pyName}: ${type}${comment}`, 1)
        })
        .filter((item) => item != null)
        .join('\n');

      const propsScript = [
        `class ${propsName}(TypedDict):`,
        propsBody || indent('pass', 1)
      ].join('\n');

      if (!comp.slots) {
        console.log(comp);
        throw Error(`Component ${compName} is missing 'slots' property`);
      }

      const slotsKwargs = (Object.keys(comp.slots)).map((slotName) => {
        const pyName = slotName.replace(/-|\./g, "_");
        const comment = pyName === slotName
        ? ""
        : `  # Mapped from '${slotName}'`;

        const isTodo = slotName.includes('<');

        const type = applyRequired('SlotContent', false);
        return isTodo
          ? indent(`# ${pyName}: ${type}${comment} # TODO`, 1)
          : indent(`${pyName}: ${type}${comment}`, 1);
      }).join('\n');

      const slotsScript = [
        `class ${slotsName}(TypedDict):`,
        slotsKwargs || indent('pass', 1),
      ].join('\n');

      const compClsName = `${compName}Cls`;
      const compAlpineClsName = `${compName}AlpineCls`;
      const compClassesScript = [
        `${compClsName} = Component[EmptyTuple, ${propsName}, ${slotsName}, Any, Any, Any]`,
        `${compAlpineClsName} = AlpineComponent[EmptyTuple, ${propsName}, ${slotsName}, Any, Any, Any]`,
      ].join('\n\n');

      const script = `${slotsScript}\n\n\n${jsPropsScript}\n\n\n${propsScript}\n\n\n${compClassesScript}`

      return script;
    }).join('\n\n\n');

    const script = [
      'from typing import Any, Dict, List, Union',
      '',
      'from django_components import Component, EmptyTuple, SlotContent',
      '',
      // TODO - This should live in django_components, OR there should be a separate
      // package for Alpine integration.
      'from django_alpinui.utils.alpine import AlpineComponent',
      'from django_alpinui.utils.types import Annotated, NotRequired, TypedDict, JS, PropMeta',
      '',
      // TODO?
      // 'class JS:',
      // '    def __init__(self, script: str) -> None:',
      // '        self.script = script',
      // '',
      // '    def __str__(self) -> str:',
      // '        return self.script',
      '',
      typesScriptBody,
      '',
    ].join('\n');

  return script;
};
    
const script = generate();
console.log(script);
fs.mkdirSync("./temp", { recursive: true });
fs.writeFileSync("./temp/alpinui_types.py", script);

fs.mkdirSync("../alpinui-django/src/django_alpinui/gen", { recursive: true });
fs.writeFileSync("../alpinui-django/src/django_alpinui/gen/alpinui_types.py", script)
