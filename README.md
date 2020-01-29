winkstone의 ws-front 프로젝트를 위한 시각화 오브젝트입니다.

## DIRECT USE

src 폴더 내 파일을 복사한 후 [src/index.js](src/index.js) 파일을 import하여 사용하십시오.

```jsx
import VisualizationObject from "./visu-obj";
import VisuObj from "./visu-obj/index";
import * as VisuObj from "./visu-obj/index.js";
import { Leaf } from "./visu-obj/index.js";

function SomeComp() {
  return (
    <>
      <VisuObj.Leaf
        data={[ /* dummy data */ ]}
        options={{ /* dummy options */ }}
      />
      <Leaf /* ... */ />
    </>
  );
}
```

각각의 컴포넌트를 직접 불러와도 좋습니다.

```js
import Sphere from "./visu-obj/Sphere";

function AnotherComp() {
  return (
    <>
      <Sphere /* ... */ />
    </>
  );
}
```

타입 정의가 필요한 경우 [types/index.d.ts](types/index.d.ts) 파일을 src 폴더로 복사하십시오. (권장)

아래 dependencies가 설치되어 있어야 합니다.

- [gsap](https://www.npmjs.com/package/gsap)
- [intersection-observer](https://www.npmjs.com/package/intersection-observer)
- [lodash-es](https://www.npmjs.com/package/lodash-es)
- [react](https://www.npmjs.com/package/react)

lodash로 lodash-es를 대체하셔도 좋습니다.

## LIKE PACKAGE

깃 저장소를 패키지처럼 설치하여 쓸 수도 있습니다.

#### `yarn add "git+https://github.com/sungchuni/ws-visu-obj.git"`

[package.json](package.json)의 dependencies 라이브러리들이, 해당 프로젝트에 설치되었는지 직접 확인 바랍니다.

## BUILD

빌드 작업은 yarn 2를 권장합니다.

#### `yarn build`

webpack --mode=none으로 컴포넌트를 dist/index.js에 빌드합니다.

#### `yarn build:dev`

webpack --mode=develpment로 컴포넌트를 빌드합니다.

#### `yarn build:prod`

webpack --mode=production으로 컴포넌트를 빌드합니다.

#### `yarn build:watch`

webpack --mode=development로 컴포넌트를 빌드하고, 변경 사항을 추적하여 다시 빌드하는 데몬을 생성합니다.
