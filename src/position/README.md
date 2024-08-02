# Acrool React Hooks / Position

<p>
    Related to position control.
</p>


## Features

### useClickOutSite

```tsx

import {isEmpty} from '@acrool/js-utils/equal';
import {Dropdown, IDropdownOption, isGroupOptions, TOption} from '@acrool/react-dropdown';
import {Flex} from '@acrool/react-grid';
import {useClickOutSite} from '@acrool/react-hooks/position';
import {useLocale} from '@acrool/react-locale';
import React, {ForwardedRef, forwardRef, useCallback, useMemo, useRef,useState} from 'react';
import styled, {css} from 'styled-components';

import Avatar from '@/components/atoms/Avatar';
import {ModalWrapper} from '@/components/atoms/ModalBgMask';
import {FormProviderConsumer} from '@/components/organize/FormHorizontalGroup';
import {EKeyboardKey} from '@/config/keyboard';
import Icon from '@/library/acrool-react-icon';
import {setForwardedRef} from '@/utils/copyRef';



export interface IProps<T extends string|null> extends FCProps {
    title?: string
    name?: string
    value?: T
    options?: TOption<T>[]
    disabled?: boolean
    onChange?: (value: T) => void
    errorMessage?: string
    remarkMessage?: string
    placeholder?: string
    isSearchEnable?: boolean
    isAvatarEnable?: boolean
    isLink?: boolean
}



/**
 * 下拉選單元件
 *
 * @param style
 * @param className
 * @param title 標題
 * @param options 下拉選單項目
 * @param disabled 是否禁用
 * @param value
 * @param onChange
 * @param ref
 */
const Select2 = <T extends string|null>({
                                            style,
                                            className,
                                            id,
                                            options,
                                            disabled = false,
                                            value,
                                            onChange,
                                            placeholder,
                                            isSearchEnable = false,
                                            isAvatarEnable = false,
                                            isLink = false,
                                        }: IProps<T>, ref?: ForwardedRef<HTMLButtonElement>) => {

    const {i18n, locale} = useLocale();

    const searchFieldRef = useRef<HTMLInputElement>(null);
    const {mainElRef, setIsVisible, isVisible} = useClickOutSite<HTMLButtonElement>();

    const [isButtonFocus, setIsButtonFocus] = useState(false);

    /**
     * 處理當Dropdown項目點擊
     * @param currentValue
     */
    const handleOnDropdownLiClick = useCallback((currentValue: T, isDiff: boolean) => {
        mainElRef.current?.focus();
        setIsVisible(false);

        if(onChange && isDiff){
            onChange(currentValue);
        }
    }, [onChange]);


    /**
     * 取得選中的文字
     */
    const getText = useMemo(() => {
        let current: IDropdownOption<T>|undefined;
        options?.findIndex((row) => {
            if(row){
                if(isGroupOptions(row)){
                    current = row.children.find(row => row.value === value);
                    return typeof current !== 'undefined';
                }
                current = row.value === value ? row: undefined;
            }

            return typeof current !== 'undefined';
        });

        return current ?
            <Flex className="align-items-center">
                {isAvatarEnable && <Avatar color={current.color} image={current.avatarUrl} size={15} className="mr-1"/>}
                {current.text}
            </Flex>
            :placeholder;


    }, [value, options, placeholder]);




    /**
     * 處理 Button focus 狀態
     */
    const handleButtonFocus = useCallback(() => setIsButtonFocus(true), []);


    /**
     * 處理當Dropdown search field blur
     */
    const handleSearchBlur = useCallback(() => {
        setTimeout(() => {
            if (document.activeElement !== mainElRef.current) {
                setIsVisible(false);
                setIsButtonFocus(false);
            }
        }, 0);
    }, []);


    /**
     * 處理按下ESC關閉Dropdown
     */
    const handleSearchEsc = useCallback(() => {
        mainElRef.current?.focus();
        setIsVisible(false);
    }, [isButtonFocus]);

    /**
     * 處理當Button blur
     */
    const handleButtonBlur = useCallback(() => {
        setTimeout(() => {
            if(document.activeElement !== searchFieldRef.current){
                // setIsSearchFocus(true);
                setIsVisible(false);
                setIsButtonFocus(false);
            }
        }, 0);
    }, []);


    /**
     * 處理Button點擊觸發
     */
    const handleButtonClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsVisible();
    }, []);


    /**
     * 取得加上Placeholder的Options
     */
    const placeholderOptions: TOption<string|null>[]|undefined = useMemo(() => {
        if(placeholder){
            const placeholderOption: IDropdownOption<string|null> = {text: placeholder, value: null};
            return options ? [placeholderOption].concat(options as IDropdownOption<T>[]): [placeholderOption];
        }
        return options;

    }, [value, options, placeholder]);




    return (<Select2Root
            disabled={disabled}
            isLink={isLink}
            className={className} style={style}
            isFocus={isButtonFocus || isVisible}
        >

            {/* Select */}
            <FormProviderConsumer>
                {htmlForId => {
                    return <SelectButton
                        type="button"
                        id={id ?? htmlForId}
                        ref={setForwardedRef(ref, mainElRef)}
                        onMouseDown={handleButtonClick}
                        onFocus={handleButtonFocus}
                        onBlur={handleButtonBlur}

                        onKeyDown={e => {
                            // console.log('e.key', e.code, e.key);
                            // 除了 Tab 以外都要阻止原本的行為跟冒泡
                            if(![EKeyboardKey.Tab, EKeyboardKey.Escape].includes(e.key as EKeyboardKey) && !e.metaKey) {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                            if([EKeyboardKey.ArrowUp, EKeyboardKey.ArrowDown, EKeyboardKey.Enter].includes(e.key as EKeyboardKey) || e.code === 'Space') {
                                setIsVisible(true);
                            }
                            return false;
                        }}

                        disabled={disabled}
                        // isCursorAuto={!isLink}
                    >
                        <DisplayText className="flex-grow-1 text-left text-ellipsis flex-grow-1" isPlaceholder={isEmpty(value)}>{getText}</DisplayText>
                        {!isLink && (
                            <ArrowDownIcon code="angle_down" size={16} color="#fff"/>
                        )}
                    </SelectButton>;
                }}
            </FormProviderConsumer>


            {/* 下拉選單 */}
            {isVisible && (
                <ModalWrapper>
                    <Dropdown
                        isDark
                        locale={locale}
                        searchForwardedRef={searchFieldRef}
                        options={placeholderOptions as TOption<T>[]}
                        value={value}
                        isAvatarEnable={isAvatarEnable}
                        isSearchEnable={isSearchEnable}
                        isCheckedEnable
                        searchTextPlaceholder={i18n('com.form.select2.searchPlaceholder', {def: 'type keyword...'})}
                        onEnter={handleOnDropdownLiClick}
                        onClick={handleOnDropdownLiClick}
                        onSearchFieldEsc={handleSearchEsc}
                        onSearchFieldBlur={handleSearchBlur}
                    />
                </ModalWrapper>
            )}

        </Select2Root>
    );
};



export default forwardRef(Select2);
```

### usePosition


```tsx
import {IPosition, usePosition} from '@acrool/react-hooks/position';
import React, {forwardRef} from 'react';
import styled, {css} from 'styled-components';

import {setForwardedRef} from '@/utils/copyRef';
import useEscClose from '@/utils/hook/useEscClose';



interface IProps extends FCChildrenProps {
    isVisible?: boolean
    onClose?: (e?: KeyboardEvent) => void
    tabIndex?: number
}

const ModalWrapper = forwardRef<HTMLDivElement, IProps>(({
    isVisible = true,
    children,
    onClose,
    tabIndex = -1
}, ref) => {
    useEscClose('ModalWrapper', onClose);
    const {positionRef, position} = usePosition();


    return <ModalWrapperRoot
        isVisible={isVisible}
        tabIndex={tabIndex}
    >
        <Container
            id="test"
            ref={setForwardedRef(ref, positionRef)}
            vertical={position?.vertical ?? 'bottom'}
            horizontal={position?.horizontal ?? 'right'}
        >
            {children}
        </Container>

    </ModalWrapperRoot>;
});

export default ModalWrapper;




const Container = styled.div<IPosition>`
    position: absolute;
    transition: opacity .3s ease;
    width: auto;
    z-index: 6;

    border: 1px solid #424242;
    border-radius: 10px;
    overflow: hidden;

    ${props => props.horizontal === 'left' && css`
        right: 0;
    `}
    ${props => props.horizontal === 'right' && css`
        left: 0;
    `}
    ${props => props.vertical === 'top' && css`
        bottom: calc(100% - 1px);
    `}
    ${props => props.vertical === 'bottom' && css`
        top: calc(100% - 1px);
    `}
`;

const ModalWrapperRoot = styled.div<{
    isVisible: boolean,
}>`
    visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
    opacity: ${props => (props.isVisible ? 1 : 0)};
    z-index: ${props => (props.isVisible ? 10 : -1)};
    pointer-events: ${props => (props.isVisible ? 'auto' : 'none')};
`;

```

### useScrollTop





