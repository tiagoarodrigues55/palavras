import React, { useEffect, useRef } from 'react';
import { DataSet, Network} from 'vis';
import Styles from '../styles/index'
const VisNetwork = ({Nodes, Edges}) => {
  const domNode = useRef(null);

  const network = useRef(null);

  // An array of nodes

  const nodes = new DataSet(Nodes);

  // An array of edges
  const edges = new DataSet(Edges);

  const data = {
    nodes,
    edges
  };
  const options = {height: '1000px',
  width: '1000px',
 
};

  useEffect(
    () => {
      network.current = new Network(domNode.current, data, options);
    },
    [domNode, network, data, options]
  );

  return (
    <Styles>
    <div className="Canvas" ref = { domNode } />

    </Styles>
  );
};

export default VisNetwork;