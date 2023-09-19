import Link from 'next/link';
import { useState } from 'react';
import styles from './tree.module.css';

export default function FileTreeViewerSolution(){

  const [fileTree, setFileTree] = useState([
    {
      id: 1,
      name: 'dir1',
      type: 'DIRECTORY',
      show: true,
      children: [
        {
          id: 2,
          name: 'dir1-1',
          type: 'DIRECTORY',
          show: true,
          children: [
            {id: 3, name: 'file1', type: 'FILE', show: true,},
            {id: 4, name: 'file2', type: 'FILE', show: true,}
          ]
        },
        {id: 5,name: 'file3', type: 'FILE', show: true,},
        {id: 6,name: 'file4', type: 'FILE', show: true,},
      ]
    },
    {
      id: 7,
      name: 'dir2',
      type: 'DIRECTORY',
      show: true,
      children: [
        {id: 8, name: 'file5', type: 'FILE', show: true,},
        {id: 9, name: 'file6', type: 'FILE', show: true,},
        {id: 10, name: 'file7', type: 'FILE', show: true,},
      ]
    },
    {id: 11, name: 'file8', type: 'FILE', show: true},
  ]);

  const showFile = (node) => {
    return (
    <div>
        FILE: {node.name}
    </div>) 
  }

  const showFolder = (node) => {
    return (
    <strong>
        FOLDER: {node.name}
    </strong>);
  }

  const searchTree =  (tree, nodeId) => {
    let currentNode;

    for (let i = 0; i < tree?.length; i++) {
      currentNode = tree[i];

      if (currentNode.id === nodeId) {
        currentNode.show = !currentNode.show;
      } else if (currentNode.children?.length > 0) {
        searchTree(currentNode.children, nodeId)
      }
  
    }
  }

  const updateTreeVisibilty = (nodeId) => {
    const newTree = [...fileTree];

    searchTree (newTree, nodeId)

    setFileTree(newTree);
  }

  const showTree = (nodes, level) => {

    
    return nodes.map((node, idx) => {
      if (node.type === 'DIRECTORY') {
        return (
        <div key={idx} style={{marginLeft:`${level+20}px`}}>
          <span>{showFolder(node)}</span>- <span style={{cursor:'pointer',textDecoration:'underline'}} onClick={() => updateTreeVisibilty(node.id)}>{node.show? 'hide': 'show'}</span>
          {node.show && showTree(node.children, level +1)}
        </div>
        );
      }
      if (node.type === 'FILE') {
        return <div style={{marginLeft:`${level+20}px`}} key={idx}>{showFile(node)}</div>;
      }
      return null; 
    });
  }

  return (
  <>
    {showTree(fileTree, 0)}

    <div className={styles.goBack}>
      <button><Link href="../challenges/file-tree-viewer">go back</Link></button>
    </div>
  </>);
};