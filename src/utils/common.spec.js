import { pick, debounce } from './common';

describe('pick util 단위테스트', () => {
  it('단일 인자로 전달된 키의 값을 객체에 담아 반환한다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    expect(pick(obj, 'a')).toEqual({ a: 'A' });
    expect(pick(obj, 'b')).toEqual({ b: { c: 'C' } });
  });

  it('2개 이상의 인자로 전달된 키의 값을 객체에 담아 반환한다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };
    expect(pick(obj, 'a', 'd')).toEqual({ a: 'A', d: null });
  });

  it('대상 객체로 아무 것도 전달 하지 않을 경우 빈 객체가 반환된다', () => {
    expect(pick()).toEqual({});
  });

  it('propNames를 지정하지 않을 경우 빈 객체가 반환된다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };
    expect(pick(obj)).toEqual({});
  });
});

// 테스트 코드는 비동기 타이머와 무관하게 동기적으로 실행된다.
// -> 비동기 함수가 실행되기 전에 단언이 실행된다.
// 타이머 모킹!

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2023-12-25'));
  });

  afterEach(() => {
    vi.useFakeTimers();
  });

  it('특정 시간이 지난 후 함수가 호출된다.', () => {
    const spy = vi.fn();
    const debouncedFn = debounce(spy, 300);
    debouncedFn();
    vi.advanceTimersByTime(300);
    expect(spy).toHaveBeenCalled();
  });

  it('연이어 호출해도 마지막 호출 기준으로 지정된 타이머 시간이 지난 경우에만 함수가 호출된다.', () => {
    const spy = vi.fn();
    const debouncedFn = debounce(spy, 300);
    debouncedFn();

    vi.advanceTimersByTime(100);
    debouncedFn();

    vi.advanceTimersByTime(100);
    debouncedFn();

    vi.advanceTimersByTime(200);
    debouncedFn();

    vi.advanceTimersByTime(300);
    debouncedFn();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
