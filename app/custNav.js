export default class CustNav extends HTMLElement {
    constructor(){
        super();
        this.activeLink = null;
    }

    connectedCallback(){
        this.activeLinkClass = this.getAttribute('activeLinkClass');
        if (!this.activeLinkClass){
            this.activeLinkClass="active-link";
        }
        const links = this.querySelectorAll("a");
        console.log(links);
        links.forEach(e => {
            this.registerListener(e);
        });
    }

    registerListener(e){
        e.onclick = evt => this.onLinkClicked(evt);
        window.onhashchange = evt => this.onAddressBarChanged(evt);
    }

    onAddressBarChanged(evt){
        const {location} = window;
        const {href} = location;
        const {hash} = location;

        const {target} = evt
        console.log(" onhashchange->", href, hash);

        
        const event = new CustomEvent('cust-event', 
        {detail: {
            href: href,
            hash: hash.substring(1),
            
        },
        bubbles: true
        }
        );
        this.dispatchEvent(event); //distributes the event to all listeners

        //select the <a> element with the current hash  value
        const element = this.querySelector(`[href="${hash}"]`);
        //toggle the class if we change the location from address bar
        this.onLinkClicked({target: element})
    }
    onLinkClicked(evt){
        const {target} = evt;
        if (this.activeLink){
            
            this.activeLink.classList.toggle(this.activeLinkClass);    
        }
        this.activeLink=target;
        this.activeLink.classList.toggle(this.activeLinkClass);
        
    }
}

customElements.define('cust-nav', CustNav);