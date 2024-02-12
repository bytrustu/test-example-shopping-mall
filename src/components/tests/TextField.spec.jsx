import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

// beforeEach(() => {
//   console.log('root - boforeEach');
// });
//
// beforeAll(() => {
//   console.log('root - beforeAll');
// });
//
// afterEach(() => {
//   console.log('root - afterEach');
// });
//
// afterAll(() => {
//   console.log('root - afterAll');
// });

// beforeEach(async () => {
//   // my-class class가 적용된 TextField 컴포넌트 렌더링
//   await render(<TextField className="my-class" />);
// });

it('className prop으로 설정한 css class가 적용된다.', async () => {
  // Arrange - 테스트를 위한 환경 만들기
  // -> className을 지닌 컴포넌트 렌더링
  // Act - 테스트할 동작 발생
  // -> 렌더링에 대한 검증이기 때문에 이 단계는 생략
  // -> 클릭이나 메서드 호출, prop 변경 등등에 대한 작업이 여기에 해당
  // Asert - 올바른 동작이 실행되었는지 검증
  // -> 렌더링 후 DOM에 해당 class가 존재하는지 검증

  // render API를 호출 -> 테스트 환경의 ㅓsDOM에 리액트 컴포넌트가 렌더링된 DOM 구조가 반영
  // jsDOM: Node.js에서 사용하기 위해 많은 웹 표준을 순수 자바스크립트로 구현
  await render(<TextField className="my-class" />);

  // vitest의 expect 함수를 사용하여 기대 결과를 검증
  // 렌더링되는 DOM 구조가 올바르게 변경되었는지 확인 (O) 최종적으로 사용자가 보는 결과는 DOM
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  expect(textInput).toHaveClass('my-class');
});

describe('placeholder', () => {
  beforeEach(() => {
    console.log('placeholder - boforeEach');
  });

  it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
    await render(<TextField />);
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    expect(textInput).toBeInTheDocument();
  });

  it('기본 placeholder prop에 따라 placeholder 변경된다.', async () => {
    await render(<TextField placeholder="상품을 입력해주세요." />);
    const textInput = screen.getByPlaceholderText('상품을 입력해주세요.');
    expect(textInput).toBeInTheDocument();
  });

  it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다', async () => {
    const spy = vi.fn();
    const { user } = await render(<TextField onChange={spy} />);
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    await user.type(textInput, 'test');
    expect(spy).toHaveBeenCalledWith('test');
  });

  it('Enter키를 입력하면 onEnter prop으로 등록한 함수가 호출된다', async () => {
    const spy = vi.fn();
    const { user } = await render(<TextField onEnter={spy} />);
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    await user.type(textInput, 'test{enter}');
    expect(spy).toHaveBeenCalledWith('test');
  });

  it('클릭시 onFocus props으로 동륵한 함수가 호출된다', async () => {
    const spy = vi.fn();
    const { user } = await render(<TextField onFocus={spy} />);
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    await user.click(textInput);
    expect(spy).toHaveBeenCalled();
  });

  it('focus 시 border 스타일이 변경된다', async () => {
    const { user } = await render(<TextField />);
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    await user.click(textInput);
    expect(textInput).toHaveStyle({
      borderWidth: 2,
      borderColor: 'rgb(25, 118, 210)',
    });
  });
});
