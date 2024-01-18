type ParsedElement = {
    original: RegExp;
    parsed: string | ((match: string, ...groups: any[]) => string);
};

export const parseMarkdown = (markdown: string): string => {
    let codeBlocks: string[] = [];
    markdown = markdown.replace(/```([\s\S]*?)```/g, (_, match) => {
        codeBlocks.push(match);
        return '\0'; // Unique placeholder
    });

    const elements: ParsedElement[] = [
        {original: /###### (.*)/g, parsed: '<h6>$1</h6>'},
        {original: /##### (.*)/g, parsed: '<h5>$1</h5>'},
        {original: /#### (.*)/g, parsed: '<h4>$1</h4>'},
        {original: /### (.*)/g, parsed: '<h3>$1</h3>'},
        {original: /## (.*)/g, parsed: '<h2>$1</h2>'},
        {original: /# (.*)/g, parsed: '<h1>$1</h1>'},
        {original: /\*\*(.*)\*\*/g, parsed: '<strong>$1</strong>'},
        {original: /__(.*)__/g, parsed: '<strong>$1</strong>'},
        {original: /\*(.*)\*/g, parsed: '<em>$1</em>'},
        {original: /_(.*)_/g, parsed: '<em>$1</em>'},
        {original: /!\[(.*?)\]\((.*?)\)/g, parsed: '<img src="$2" alt="$1">'},
        {original: /\[(.*?)\]\((.*?)\)/g, parsed: '<a href="$2">$1</a>'},
        {
            original: /(?:^- (.*)(?:\n|$))+/gm,
            parsed: (match) => '<ul>' + match.split('\n').map(item => item ? `<li>${item.slice(2)}</li>` : '').join('') + '</ul>'
        },
        {
            original: /(?:^\d+\. (.*)(?:\n|$))+/gm,
            parsed: (match) => '<ol>' + match.split('\n').map(item => item ? `<li>${item.slice(3)}</li>` : '').join('') + '</ol>'
        },
        {original: /\n/g, parsed: '<br>'},
        {original: /!\[(.*?)\]\((.*?)\)/g, parsed: '<img src="$2" alt="$1">'}
    ];

    markdown = elements.reduce((acc, element) => {
        return acc.replace(element.original, (match, ...args) => {
            if (typeof element.parsed === 'function') {
                return element.parsed(match, ...args);
            }
            return element.parsed.replace('$1', args[0]).replace('$2', args[1]);
        });
    }, markdown);

    codeBlocks.forEach((block) => {
        markdown = markdown.replace('\0', `<pre><code>${block}</code></pre>`);
    });

    return markdown;
};
