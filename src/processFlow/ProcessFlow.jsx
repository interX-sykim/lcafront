import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, { Controls, useNodesState, useEdgesState, addEdge, Node, Edge } from 'reactflow';
import { FiFile } from 'react-icons/fi';

import 'reactflow/dist/base.css';
import './index.css';
import TurboNode, { TurboNodeData } from './TurboNode';
import TurboEdge from './TurboEdge';
import FunctionIcon from './FunctionIcon'

import PageTitle from "../component/common/PageTitle";

import axios from 'axios';

const initialNodes = [
  // {
  //   id: '1',
  //   position: { x: 0, y: 0 },
  //   data: { icon: <FunctionIcon />, title: 'readFile', subline: 'api.ts' },
  //   type: 'turbo',
  // },
  // {
  //   id: '2',
  //   position: { x: 250, y: 0 },
  //   data: { icon: <FunctionIcon />, title: 'bundle', subline: 'apiContents' },
  //   type: 'turbo',
  // },
  // {
  //   id: '3',
  //   position: { x: 0, y: 250 },
  //   data: { icon: <FunctionIcon />, title: 'readFile', subline: 'sdk.ts' },
  //   type: 'turbo',
  // },
  // {
  //   id: '4',
  //   position: { x: 250, y: 250 },
  //   data: { icon: <FunctionIcon />, title: 'bundle', subline: 'sdkContents' },
  //   type: 'turbo',
  // },
  // {
  //   id: '5',
  //   position: { x: 500, y: 125 },
  //   data: { icon: <FunctionIcon />, title: 'concat', subline: 'api, sdk' },
  //   type: 'turbo',
  // },
  // {
  //   id: '6',
  //   position: { x: 750, y: 125 },
  //   data: { icon: <FiFile />, title: 'fullBundle' },
  //   type: 'turbo',
  // },
];

const initialEdges = [
  // {
  //   id: 'e1-2',
  //   source: '1',
  //   target: '2',
  // },
  // {
  //   id: 'e3-4',
  //   source: '3',
  //   target: '4',
  // },
  // {
  //   id: 'e2-5',
  //   source: '2',
  //   target: '5',
  // },
  // {
  //   id: 'e4-5',
  //   source: '4',
  //   target: '5',
  // },
  // {
  //   id: 'e5-6',
  //   source: '5',
  //   target: '6',
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

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  
  const [processList, setProcessList] = useState([]);

  useEffect(() => {
    axios.get("/process")
    .then((response) => {
      setProcessList(response.data);
    })
    .catch((error) => {
      console.log(error);
      setProcessList([]);
    })
  }, [])

  console.log(processList)
  if (processList.length > 0 && initialNodes.length === 0) {
    for (var i = 0; i < processList.length; i++) {
      initialNodes.push({
        id: processList[i].id + '',
        position : { x: 250 * (i / 2), y: 250 * (i % 2) },
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
  console.log(edges)



  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  return (
    <div style={{height:'700px'}}>
      <PageTitle />
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

export default Flow;