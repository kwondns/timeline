import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

type TreeNodeType = {
  tagName: string;
  properties: {
    loading: string;
    src: string;
    alt: string;
    [key: string]: string;
  };
  type: string;
  children: TreeNodeType[];
  position: {
    start: {
      line: number;
      column: number;
      offset: number;
    };
    end: {
      line: number;
      column: number;
      offset: number;
    };
  };
};
export const imgLazyLoading: Plugin = () => (tree) => {
  visit(tree, 'element', (node: TreeNodeType) => {
    if (node.tagName === 'img' && node.properties) {
      node.properties.loading = 'lazy';
    }
  });
};
