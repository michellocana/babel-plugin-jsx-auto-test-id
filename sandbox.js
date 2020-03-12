const babel = require('@babel/core')

babel.transform(
  `
import * as React from 'react'

export default function FunctionComponent() {
  return <React.Fragment />
}
  `,
  {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [require('./src/index')]
  },
  (err, result) => {
    console.log(err, result)
  }
)
