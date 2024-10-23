import {act, renderHook} from '@testing-library/react';

import useCountDownTimer from './useCountDownTimer';

describe('useCountDownTimer 倒數計時器', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    // 測試倒數計時十秒後 是否有呼叫 callback
    it('倒數十秒後呼叫callback',  async () => {
        const callback = jest.fn();
        const {result} = renderHook(() => useCountDownTimer());

        const targetSec = 10 * 1000;
        await act(async () => {
            result.current.start(targetSec).then(callback);
            jest.advanceTimersByTime(targetSec); //等待10秒
        });

        expect(result.current.totalSeconds).toEqual(0);
        expect(callback).toBeCalledTimes(1);
    });

    it('測試倒數計時開啟 loop 是否有重新計時', async () => {
        // 測試案例目前 Jest 測不出循環 Promise
    });

    // 測試傳入負數是否跳出計時
    it('測試傳入負數是否跳出計時',  () => {
        const callback = jest.fn();
        const {result} = renderHook(() => useCountDownTimer());

        const targetSec = 5 * 1000;

        act(() => {
            result.current.start(-10);
            jest.advanceTimersByTime(targetSec); //等待5秒
        });

        expect(result.current.totalSeconds).toEqual(0);
        expect(callback).toBeCalledTimes(0);
    });

    it('測試 unmount 是否清除計時器',  () => {
        const {result, unmount} = renderHook(() => useCountDownTimer());

        const targetSec = 5 * 1000;

        act(() => {
            result.current.start(10 * 1000);
            jest.advanceTimersByTime(targetSec); //等待5秒
        });

        expect(result.current.totalSeconds).toEqual(5);
        unmount();

        act(() => {
            jest.advanceTimersByTime(8 * 1000); //再等待8秒
        });

        // 沒有計時器 所以仍然是5
        expect(result.current.totalSeconds).toEqual(5);
    });

    it('測試五秒後再次呼叫計時器剩餘秒數是否正常',  () => {
        const {result} = renderHook(() => useCountDownTimer());

        const targetSec = 10 * 1000;

        act(() => {
            result.current.start(targetSec); // 開始倒數10秒
            jest.advanceTimersByTime(5 * 1000); // 等待5秒
        });

        // 確認此時剩餘秒數為5秒
        expect(result.current.totalSeconds).toBe(5);

        act(() => {
            result.current.start(targetSec); // 再次啟動倒數10秒
            jest.advanceTimersByTime(2 * 1000); // 等待2秒
        });

        // 確認此時剩餘秒數為8秒
        expect(result.current.totalSeconds).toBe(8);
    });
});

