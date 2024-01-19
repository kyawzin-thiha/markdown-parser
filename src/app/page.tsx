'use client';

import { useCallback, useState } from 'react';
import { parseMarkdown } from '@/lib/parser';
import Editor from '@monaco-editor/react';
import styles from './page.module.scss';

export default function Home() {
	const [parsedValue, setParsedValue] = useState<string>('// writ your markdown here');
	const onChange = useCallback((value: string | undefined) => {
		if (value) setParsedValue(parseMarkdown(value));
	}, []);


	return (
		<main className={styles.main}>
			<div className={styles.header}>
				<h1 className={styles.title}>Markdown Editor</h1>
				<p className={styles.subtitle}>A powerful Markdown editor and parser built using Next.js</p>
			</div>
			<div className={styles.inputContainer}>
				<div className={styles.editorContainer}>
					<Editor
						width="100%"
						height="100%"
						defaultLanguage="markdown"
						defaultValue="// writ your markdown here"
						className={styles.editor}
						onChange={onChange}
						options={{
							fontSize: 16,
							automaticLayout: true,
							trimAutoWhitespace: true,
							autoClosingQuotes: 'always',
							autoClosingBrackets: 'always',
							autoClosingOvertype: 'always',
							autoIndent: 'full',
							autoClosingComments: 'always',
							scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
							cursorStyle: 'line',
							lineNumbers: 'off',
							minimap: { autohide: true },
						}}
					/>
				</div>
				<div className={styles.parserContainer}>
					<div className={styles.parser} dangerouslySetInnerHTML={{ __html: parsedValue }} />
				</div>
			</div>
		</main>
	);
}