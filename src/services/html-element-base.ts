interface Options {
    templateIdSelector: string;
}

export class HTMLElementBase extends HTMLElement {
    options: Options;
    constructor(options: Options) {
        super();
        this.options = options;
    }

    connectedCallback() {
        const template = document.getElementById(this.options.templateIdSelector) as HTMLTemplateElement;
        if (!(template instanceof HTMLTemplateElement)) {
            throw new Error(`cannot find template with templateId ${this.options.templateIdSelector}`);
        }
        this.appendChild(template.content.cloneNode(true));
    }

}