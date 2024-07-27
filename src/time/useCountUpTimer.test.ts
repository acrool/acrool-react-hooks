import {act, renderHook} from '@testing-library/react';

import useCountUpTimer from './useCountUpTimer';

jest.useFakeTimers();

describe('useCountUpTimer 碼錶', () => {
    let startTime: string;
    beforeEach(() => {
        startTime = new Date().toISOString();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('starts at 00:00:00', () => {
        const {result} = renderHook(() => useCountUpTimer());
        act(() => {
            result.current.start(startTime);
        });
        expect(result.current.time).toEqual(0);
    });

    it('shows 00:00:01 after 1 second', () => {
        const {result} = renderHook(() => useCountUpTimer());
        act(() => {
            result.current.start(startTime);
            jest.advanceTimersByTime(1000);
        });
        expect(result.current.time).toEqual(1);
    });

    it('shows 00:01:00 after another 59 seconds', () => {
        const {result} = renderHook(() => useCountUpTimer());
        act(() => {
            result.current.start(startTime);
            jest.advanceTimersByTime(60 * 1000); // 1 minute
        });
        expect(result.current.time).toEqual(60);
    });

    it('shows 01:00:00 after another 3540 seconds', () => {
        const {result} = renderHook(() => useCountUpTimer());
        act(() => {
            result.current.start(startTime);
            jest.advanceTimersByTime(3600 * 1000); // 1 hour
        });
        expect(result.current.time).toEqual(3600);
    });

    it('測試 unmount 是否清除計時器', () => {
        const {result, unmount} = renderHook(() => useCountUpTimer());

        act(() => {
            result.current.start(startTime);
            jest.advanceTimersByTime(5 * 1000); // 等待5秒
        });

        expect(result.current.time).toEqual(5);
        unmount();

        act(() => {
            jest.advanceTimersByTime(8 * 1000); // 再等待8秒
        });

        // 沒有計時器 所以仍然是5
        expect(result.current.time).toEqual(5);
    });

    it('stops the timer', () => {
        const {result} = renderHook(() => useCountUpTimer());

        act(() => {
            result.current.start(startTime);
            jest.advanceTimersByTime(5 * 1000); // 等待5秒
        });

        expect(result.current.time).toEqual(5);

        act(() => {
            result.current.stop();
            jest.advanceTimersByTime(5 * 1000); // 再等待5秒
        });

        // 計時器已經停止，所以時間應該保持不變
        expect(result.current.time).toEqual(5);
    });
});
