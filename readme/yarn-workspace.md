## yarn workkspace란?

package.json에 workspace에 등록하게 되면 각각의 프로젝트를 로컬 npm 패키지처럼 인식한다.
즉, 워크플레이스에 있는 프로젝트(하위 패키지)들은 서로 참조하는 연관 관계를 가질 수 있다.

- 의존성이 공통으로 관리되기 때문에 의존성 관리가 수월해진다.
- yarn link로 하나씩 연결해주는 것보다 전체가 한번에 적용된다고 하니 더 효과적이라고 한다.(yarn 공식문서)
- 각각의 프로젝트(하위 패키지)에 .lock 파일, node_modules 대신에 상위의 하나에서 관리된다.

### workspace 만드는 법

package.json에 workspaces 속성에 배열로 넣어주면 된다.

- glob 패턴지원 ex) `"workspaces": ["packages/*"]`

> `private: true` 는 필수
>
> workspaces는 publish가 되는 것이 아니기 때문이다.

```json
//package.json

{
  "private": true,
  "workspaces": ["workspace-a", "workspace-b"]
}
```

- workspace-a/package.json

```json
{
  "name": "workspace-a",
  "version": "1.0.0",

  "dependencies": {
    "cross-env": "5.0.5"
  }
}
```

- workspace-b/package.json

```json
{
  "name": "workspace-b",
  "version": "1.0.0",

  "dependencies": {
    "cross-env": "5.0.5",
    "workspace-a": "1.0.0"
  }
}
```

이제 yarn install을 하게 되면 아래와 같은 디렉토리 구조가 만들어 질 것이다.

```
/package.json
/yarn.lock

/node_modules
/node_modules/cross-env
/node_modules/workspace-a -> /workspace-a

/workspace-a/package.json
/workspace-b/package.json
```

- node_modules에 `workspace-a`가 들어있다. 하지만 **`workspace-b`는 없다**.

  why? `workspace-b`에서 `workspace-a`에 의존성이 없기 때문에 **workspace-a만 node_modules에 있다.**

## yarn link, lerna 차이는 뭘까

yarn의 workspaces는 기본적인 워크스페이스의 기능만 제공해준다. Lerna가 제공하고 있는 다양한 기능들은 제공하지 않는다고 한다.

하지만 yarn link 같은 것을 활용하면 나름 유용하게 사용할 수 도 있을 것 같다.

### 참조

- [yarn](https://classic.yarnpkg.com/lang/en/docs/workspaces/)
