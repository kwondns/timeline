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

/**
 * @function imgLazyLoading
 * @description HTML 트리 내부의 모든 `<img>` 태그에 `loading="lazy"` 속성을 추가하여
 * 이미지 지연 로딩을 활성화하는 플러그인입니다.
 *
 * @param {Object} tree — HTML 트리를 표현하는 node 객체입니다. `unist` 포맷의 트리를 따릅니다.
 * @returns {void} — 반환값이 없습니다. 입력받은 트리를 직접 수정합니다.
 *
 * @throws {TypeError} — `tree`가 유효한 형식의 객체가 아닐 경우 발생합니다.
 *
 * @example
 * // 예시 코드: 이미지 태그에 지연 로딩 속성을 추가함
 * import { unified } from 'unified';
 * import parse from 'rehype-parse';
 * import stringify from 'rehype-stringify';
 *
 * const htmlString = `<img src="example.jpg" alt="Example Image"/>`;
 * unified()
 *   .use(parse)
 *   .use(imgLazyLoading)
 *   .use(stringify)
 *   .process(htmlString)
 *   .then((file) => {
 *     console.log(String(file));
 *     // 출력: <img src="example.jpg" alt="Example Image" loading="lazy"/>
 *   });
 *
 * @see https://developer.mozilla.org/ko/docs/Web/HTML/Element/img#attr-loading
 * @see https://github.com/syntax-tree/unist — `unist` 포맷에 대한 사양
 */
export const imgLazyLoading: Plugin = () => (tree) => {
  visit(tree, 'element', (node: TreeNodeType) => {
    if (node.tagName === 'img' && node.properties) {
      node.properties.loading = 'lazy';
    }
  });
};
