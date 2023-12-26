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
  const processSortedList = []

  if (processList.processData.length > 0) {
    processSortedList.push(processList.processData[processList.root])
    
      while (true) {
        const curProcess = processSortedList[processSortedList.length -1] 
        if (curProcess.target !== -1) {
          processSortedList.push(processList.processData[curProcess.target])
        } else {
          break
        }
      }
  }

  if (processSortedList.length > 0 && nodes.length === 0) {
    for (var i = 0; i < processSortedList.length; i++) {
      initialNodes.push({
        id: processSortedList[i].id + '',
        position : { x: 500 * i, y: 0 },
        data: { icon: <FunctionIcon/>, title: processSortedList[i].name, subline: 'CO2EQ : ' + processSortedList[i].co2eq + ''},
        type: 'turbo'
      }) 
      
      if (processSortedList[i].target !== -1) {
        initialEdges.push({
          id: 'e' + processSortedList[i].id + '-' + processSortedList[i].target
          , source: processSortedList[i].id + '',
          target: processSortedList[i].target + ''
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
