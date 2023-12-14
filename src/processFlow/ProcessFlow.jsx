import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, { Controls, useNodesState, useEdgesState, addEdge, Node, Edge } from 'reactflow';
import { FiFile } from 'react-icons/fi';

import 'reactflow/dist/base.css';
import './index.css';
import TurboNode, { TurboNodeData } from './TurboNode';
import TurboEdge from './TurboEdge';
import FunctionIcon from './FunctionIcon'


const initialNodes = [
  // {
  //   id: '1',
  //   position: { x: 0, y: 0 },
  //   data: { icon: <FunctionIcon />, title: 'readFile', subline: 'api.ts' },
  //   type: 'turbo',
  // },
];

const initialEdges = [
  // {
  //   id: 'e1-2',
  //   source: '1',
  //   target: '2',
  // },
];

const nodeTypes = {
  turbo: TurboNode,
};

const edgeTypes = {
  turbo: TurboEdge,
};

const defaultEdgeOptions = {
  type: 'turbo',
  markerEnd: 'edge-circle',
};

export default function Flow(props) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { processList } = props;

  if (processList.length > 0 && nodes.length === 0) {
    for (var i = 0; i < processList.length; i++) {
      initialNodes.push({
        id: processList[i].id + '',
        position : { x: 500 * (-Math.floor(i / 2) + i % 2), y: 0 },
        data: { icon: <FunctionIcon/>, title: processList[i].name, subline: 'CO2EQ : ' + processList[i].co2eq + ''},
        type: 'turbo'
      }) 
      
      if (processList[i].target !== -1) {
        initialEdges.push({
          id: 'e' + processList[i].id + '-' + processList[i].target
          , source: processList[i].id + '',
          target: processList[i].target + ''
        })
      } 
    }
    setNodes(initialNodes)
    setEdges(initialEdges)
  }

  console.log(nodes)

  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  return (
    <div style={{height:'700px'}}>
      <ReactFlow
        style={{height:'500px'}}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        preventScrolling={false}
      >
        <Controls showInteractive={false} />
        <svg>
          <defs>
            <linearGradient id="edge-gradient">
              <stop offset="0%" stopColor="#ae53ba" />
              <stop offset="100%" stopColor="#2a8af6" />
            </linearGradient>

            <marker
              id="edge-circle"
              viewBox="-5 -5 10 10"
              refX="0"
              refY="0"
              markerUnits="strokeWidth"
              markerWidth="10"
              markerHeight="10"
              orient="auto"
            >
              <circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0" />
            </marker>
          </defs>
        </svg>
      </ReactFlow>
    </div>
  );
};
