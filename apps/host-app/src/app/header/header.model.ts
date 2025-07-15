import { SohoButtonType } from "ids-enterprise-ng";

export interface HeaderToolbarOptions {
    toolbarButtons: Array<HeaderButtonOptions>;
}

/**
 * This is an interface mapping for programatically constructing a Toolbar.
 * This is useful when there is no template that can be used, for example
 * in the case of a header toolbar. Since the header toolbar is not in scope of
 * the component using it then we need another way of building and receiving
 * events from a toolbar.
 */
export interface HeaderButtonOptions {
    // Unique identifier for this button in the toolbar.
    id?: string;
    // The label before the button.
    label?: string;
    // The text for the button.
    text?: string;
    // The tooltip for the button.
    title?: string;
    // The icon for the button.
    type: SohoButtonType;
    // The type of button 'primary,secondary,tertiaty,icon'
    istoggle: boolean;
    // Is icon toggle
    icon?: string;
    // Is the button disabled
    disabled?: boolean;
    // Is the button hidden
    hidden?: boolean;
    // The href to run when clicked.
    href?: string;
    // The button is On.
    toggleOnIcon?: string;
    // The button is Off.
    toggleOffIcon?: string;
    // The class for the button style
    class?: string;
    // The button is On.
    toggleOnClass?: string;
    // The button is Off.
    toggleOffClass?: string;
    // The button is On.
    toggleOnText?: string;
    // The button is Off.
    toggleOffText?: string;
    // Data to keep associated with this button.
    data: any;
    // Whether this button has a dropdown menu with menu items.
    menu?: Array<HeaderButtonOptions>;
}