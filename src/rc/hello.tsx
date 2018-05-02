import * as React from 'react';
import './hello.css';

interface HelloProps {
  name: string;
}

const BigNumber = ({ number }: {
  number: number
}) => {
  return (
    <h1>{number}</h1>
  )
}

export default class Hello extends React.Component<HelloProps, any> {
  render() {
    return <h2>hello!{this.props.name}<BigNumber number={123321} /></h2>
  }
}