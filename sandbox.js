const babel = require('@babel/core')

babel.transform(
  `
import React from 'react'

export default function FunctionComponent() {
  return <div />
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
