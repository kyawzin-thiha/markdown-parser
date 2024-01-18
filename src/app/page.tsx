'use client';

import {useCallback, useState} from 'react';
import {parseMarkdown} from '@/lib/parser';
import Editor from '@monaco-editor/react';
import styles from './page.module.scss';

export default function Home() {
    const [parsedValue, setParsedValue] = useState<string>('');

    const onChange = useCallback((value: string | undefined) => {
        setParsedValue(parseMarkdown(value as string));
    }, []);

    return (
        <main className={styles.main}>
            <div className={styles.editorContainer}>
                <Editor
                    width="100%"
                    height="100%"
                    defaultLanguage="markdown"
                    defaultValue="// some comment"
                    className={styles.editor}
                    onChange={onChange}
                    options={{
                        fontSize: 16,
                        padding: {top: 10},
                        trimAutoWhitespace: true,
                        autoClosingQuotes: 'always',
                        autoClosingBrackets: 'always',
                        autoClosingOvertype: 'always',
                        autoIndent: 'full',
                        autoClosingComments: 'always',
                        scrollbar: {vertical: 'hidden', horizontal: 'hidden'},
                        cursorStyle: 'line',
                        lineNumbers: 'off',
                        minimap: {autohide: true}
                    }}
                />
            </div>
            <div className={styles.parserContainer}>
                <div className={styles.parser} dangerouslySetInnerHTML={{__html: parsedValue}}/>
            </div>
        </main>
    );
}