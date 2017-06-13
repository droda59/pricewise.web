// tslint:disable:max-file-line-count

declare namespace SemanticUI {
  type JQuerySelectorOrElement = string | Element | JQuery;

  type AnimationDuration = string | number; // '500ms'

  type AnimationName = 'scale' | 'scale in' | 'scale out'
    | 'fade' | 'fade up' | 'fade down' | 'fade left' | 'fade right'
    | 'fade in' | 'fade up in' | 'fade down in' | 'fade left in' | 'fade right in'
    | 'fade out' | 'fade up out' | 'fade down out' | 'fade left out' | 'fade right out'
    | 'horizontal flip' | 'vertical flip'
    | 'horizontal flip in' | 'vertical flip in'
    | 'horizontal flip out' | 'vertical flip out'
    | 'drop' | 'drop in' | 'drop out'
    | 'fly up' | 'fly down' | 'fly left' | 'fly right'
    | 'fly up in' | 'fly down in' | 'fly left in' | 'fly right in'
    | 'fly up out' | 'fly down out' | 'fly left out' | 'fly right out'
    | 'swing up' | 'swing down' | 'swing left' | 'swing right'
    | 'swing up in' | 'swing down in' | 'swing left in' | 'swing right in'
    | 'swing up out' | 'swing down out' | 'swing left out' | 'swing right out'
    | 'browse' | 'browse right'
    | 'browse in' | 'browse right in'
    | 'browse out' | 'browse right out'
    | 'slide up' | 'slide down' | 'slide left' | 'slide right'
    | 'slide up in' | 'slide down in' | 'slide left in' | 'slide right in'
    | 'slide up out' | 'slide down out' | 'slide left out' | 'slide right out'
    // Static Animations
    | 'jiggle'
    | 'flash'
    | 'shake'
    | 'pulse'
    | 'tada'
    | 'bounce'
    ;

  /*
   * Behavior: API
   */

  interface ApiSettings {
    on?: 'auto' | 'now' | 'input' | 'propertychange' | 'keyup' | 'submit' | 'click' | string;
    cache?: boolean | 'local';
    stateContext?: boolean | JQuerySelectorOrElement;
    encodeParameters?: boolean;
    defaultData?: boolean;
    serializeForm?: boolean;
    throttle?: number;
    throttleFirstRequest?: boolean;
    interruptRequests?: boolean;
    loadingDuration?: number;
    hideError?: 'auto' | boolean;
    errorDuration?: number;
    // Request Settings
    action?: string | boolean;
    url?: string | boolean;
    urlData?: Object | boolean;
    response?: ((settings?: ApiAjaxSettings) => any) | boolean | any;
    responseAsync?: (settings: ApiAjaxSettings, callback: (response: any) => void) => any;
    mockResponse?: ((settings?: ApiAjaxSettings) => any) | boolean | any;
    mockResponseAsync?: (settings: ApiAjaxSettings, callback: (response: any) => void) => any;
    method?: string; // 'POST', 'GET', 'PUT', ...
    dataType?: string; // 'json' | 'jsonp' | 'xml' | 'script' | 'html' | 'text'
    data?: any;
    // Callbacks
    beforeSend?: (settings: ApiAjaxSettings) => ApiAjaxSettings | boolean | void;
    beforeXHR?: (xhr: JQueryXHR, settings: JQueryAjaxSettings) => any;
    onRequest?: (promise: JQueryDeferred<any>, xhr: JQueryXHR) => any;
    onResponse?: ((response: any) => any) | any;
    successTest?: ((response: any) => boolean) | any;
    onSuccess?: (response: any, element: JQuery, xhr: JQueryXHR) => any;
    onComplete?: (response: any, element: JQuery, xhr: JQueryXHR) => any;
    onFailure?: (response: any, element: JQuery, xhr: JQueryXHR) => any;
    onError?: (errorMessage: string, element: JQuery, xhr: JQueryXHR) => any;
    onAbort?: (errorMessage: string, element: JQuery, xhr: JQueryXHR) => any;
    // DOM Settings
    namespace?: string;
    regExp?: {
      required?: RegExp,
      optional?: RegExp,
    };
    selector?: {
      disabled?: string,
      form?: string,
    };
    metadata?: {
      action?: string,
      url?: string,
    };
    className?: {
      loading?: string,
      error?: string,
    };
    // DBG Settings
    name?: string;
    silent?: boolean;
    debug?: boolean;
    performance?: boolean;
    verbose?: boolean;
    error?: {
      beforeSend?: string,
      error?: string,
      exitConditions?: string,
      JSONParse?: string,
      legacyParameters?: string,
      method?: string,
      missingAction?: string,
      missingSerialize?: string,
      missingURL?: string,
      noReturnedValue?: string,
      noStorage?: string,
      parseError?: string,
      requiredParameter?: string,
      statusMessage?: string,
      timeout?: string,
    };
  }

  type ApiBehavior = 'query'
    | 'add url data'
    | 'get request'
    | 'abort'
    | 'reset'
    | 'was cancelled'
    | 'was failure'
    | 'was successful'
    | 'was complete'
    | 'is disabled'
    | 'is mocked'
    | 'is loading'
    | 'set loading'
    | 'set error'
    | 'remove loading'
    | 'remove error'
    | 'get event'
    | 'get url encoded value'
    | 'read cached response'
    | 'write cached response'
    | 'create cache'
    | 'destroy'
    ;

  interface ApiAjaxSettings extends ApiSettings, JQueryAjaxSettings {
    cache?: any;
    error?: any;
    url?: string;
    beforeSend? (settings: ApiAjaxSettings): ApiAjaxSettings | boolean; // <- shutup compiler!
    beforeSend? (xhr: JQueryXHR, settings: JQueryAjaxSettings): any; // <- expect this!
  }


  /*
   * Behavior: Form
   */

  interface FormSettings {
    keyboardShortcuts?: boolean;
    on?: 'submit' | 'blur' | 'change';
    revalidate?: boolean;
    delay?: number;
    inline?: boolean;
    transition?: AnimationName;
    duration?: AnimationDuration;
    // Form Prompts
    text?: {
      unspecifiedRule?: string,
      unspecifiedField?: string,
    };
    prompt?: {
      empty?: string,
      checked?: string,
      email?: string,
      url?: string,
      regExp?: string,
      integer?: string,
      decimal?: string,
      number?: string,
      is?: string,
      isExactly?: string,
      not?: string,
      notExactly?: string,
      contain?: string,
      containExactly?: string,
      doesntContain?: string,
      doesntContainExactly?: string,
      minLength?: string,
      length?: string,
      exactLength?: string,
      maxLength?: string,
      match?: string,
      different?: string,
      creditCard?: string,
      minCount?: string,
      exactCount?: string,
      maxCount?: string,
    };
    // Callbacks
    onValid?: Function;
    onInvalid?: (fieldErrors: string[]) => any;
    onSuccess?: (event: Event, values: {[x: string]: string | boolean}) => boolean;
    onFailure?: (formErrors: string[], values: {[x: string]: string | boolean}) => boolean;
    // DOM Settings
    namespace?: string;
    selector?: {
      checkbox?: string,
      clear?: string,
      field?: string,
      group?: string,
      input?: string,
      message?: string,
      prompt?: string,
      radio?: string,
      reset?: string,
      submit?: string,
      uiCheckbox?: string,
      uiDropdown?: string,
    };
    metadata?: {
      defaultValue?: string,
      validate?: string,
    };
    templates?: {
      error?: (errors: string[]) => string | JQuery,
      prompt?: (errors: string[]) => JQuery,
    };
    className?: {
      error?: string,
      label?: string,
      pressed?: string,
      success?: string,
    };
    // DBG Settings
    name?: string;
    silent?: boolean;
    debug?: boolean;
    performance?: boolean;
    verbose?: boolean;
    error?: {
      identifier?: string,
      method?: string,
      noRule?: string,
      oldSyntax?: string,
    };
  }

  type FormBehavior = 'submit'
    | 'is valid'
    | 'validate form'
    | 'get change event'
    | 'get field'
    | 'get value'
    | 'get values'
    | 'set value'
    | 'set values'
    | 'get validation'
    | 'has field'
    | 'add errors'
    | 'reset'
    | 'clear'
    ;


  /*
   * Behavior: Visibility
   */

  type VisibilityCallback = (calculations: {[x: string]: any}, screen: {[x: string]: any}) => any;

  interface VisibilitySettings {
    once?: boolean;
    continuous?: boolean;
    type?: 'image' | 'fixed' | boolean;
    initialCheck?: boolean;
    context?: JQuerySelectorOrElement;
    refreshOnLoad?: boolean;
    refreshOnResize?: boolean;
    checkOnRefresh?: boolean;
    zIndex?: number;
    offset?: number;
    includeMargin?: boolean;
    throttle?: number | boolean;
    observeChanges?: boolean;
    transition?: AnimationName | boolean;
    duration?: AnimationDuration;
    // Callbacks: Visibility
    onTopVisible?: boolean | VisibilityCallback;
    onTopPassed?: boolean | VisibilityCallback;
    onBottomVisible?: boolean | VisibilityCallback;
    onPassing?: boolean | VisibilityCallback;
    onBottomPassed?: boolean | VisibilityCallback;
    onTopVisibleReverse?: boolean | VisibilityCallback;
    onTopPassedReverse?: boolean | VisibilityCallback;
    onBottomVisibleReverse?: boolean | VisibilityCallback;
    onPassingReverse?: boolean | VisibilityCallback;
    onBottomPassedReverse?: boolean | VisibilityCallback;
    onPassed?: {
      [x: string]: VisibilityCallback;
      [x: number]: VisibilityCallback;
    };
    // Callbacks: Image
    onLoad?: Function;
    onAllLoaded?: Function;
    // Callbacks: Fixed
    onFixed?: Function;
    onUnfixed?: Function;
    // Callbacks: Utility
    onUpdate?: boolean | ((calculations: {[x: string]: any}) => void);
    onRefresh?: Function;
    // DOM Settings
    namespace?: string;
    metadata?: {
      src?: string,
    };
    className?: {
      fixed?: string,
      placeholder?: string,
    };
    // DBG Settings
    name?: string;
    silent?: boolean;
    debug?: boolean;
    performance?: boolean;
    verbose?: boolean;
    error?: {
      method?: string,
      visible?: string,
    };
  }

  type VisibilityBehavior = 'disable callbacks'
    | 'enable callbacks'
    | 'is on screen'
    | 'is off screen'
    | 'get pixels passed'
    | 'get element calculations'
    | 'get screen calculations'
    | 'get screen size'
    ;


  /*
   * Module: Accordion
   */

  interface AccordionSettings {
    exclusive?: boolean;
    on?: 'click' | 'hover' | string;
    animateChildren?: boolean;
    closeNested?: boolean;
    collapsible?: boolean;
    duration?: AnimationDuration;
    easing?: 'easeInOutQuint' | string;
    // Callbacks
    onOpening?: Function;
    onOpen?: Function;
    onClosing?: Function;
    onClose?: Function;
    onChange?: Function;
    // DOM Settings
    namespace?: string;
    selector?: {
      accordion?: string,
      title?: string,
      trigger?: string,
      content?: string,
    };
    className?: {
      active?: string,
      animating?: string,
    };
    // DBG Settings
    name?: string;
    silent?: boolean;
    debug?: boolean;
    performance?: boolean;
    verbose?: boolean;
    error?: {
      method?: string,
    };
  }

  type AccordionBehavior = 'refresh'
    | 'open'
    | 'close others'
    | 'close'
    | 'toggle'
    ;


  /*
   * Module: Checkbox
   */

  interface CheckboxSettings {
    uncheckable?: 'auto' | boolean;
    fireOnInit?: boolean;
    // Callbacks
    onChange?: () => void; // todo: more specific function descriptions from here on
    onChecked?: () => void;
    onIndeterminate?: () => void;
    onDeterminate?: () => void;
    onUnchecked?: () => void;
    beforeChecked?: () => boolean;
    beforeIndeterminate?: () => boolean;
    beforeDeterminate?: () => boolean;
    beforeUnchecked?: () => boolean;
    onEnable?: () => void;
    onDisable?: () => void;
    // DOM Settings
    namespace?: string;
    selector?: {
      input?: string,
      label?: string,
    };
    className?: {
      checked?: string,
      disabled?: string,
      radio?: string,
      readOnly?: string,
    };
    // DBG Settings
    name?: string;
    silent?: boolean;
    debug?: boolean;
    performance?: boolean;
    verbose?: boolean;
    error?: {
      method?: string
    };
  }

  type CheckboxBehavior = 'toggle'
    | 'check'
    | 'uncheck'
    | 'indeterminate'
    | 'determinate'
    | 'enable'
    | 'set checked'
    | 'set unchecked'
    | 'set indeterminate'
    | 'set determinate'
    | 'set enabled'
    | 'set disabled'
    | 'is radio'
    | 'is checked'
    | 'is unchecked'
    | 'can change'
    | 'should allow check'
    | 'should allow uncheck'
    | 'should allow determinate'
    | 'should allow indeterminate'
    | 'can uncheck'
    ;


  /*
   * Module: Dimmer
   */

  interface DimmerSettings {
    opacity?: number | 'auto';
    variation?: boolean | 'inverted' | 'simple';
    dimmerName?: boolean | string;
    closable?: boolean | 'auto';
    on?: boolean | 'hover' | 'click';
    useCSS?: boolean;
    duration?: AnimationDuration | {
      show?: AnimationDuration,
      hide?: AnimationDuration,
    };
    transition?: AnimationName;
    // Callbacks
    onShow?: () => void;
    onHide?: () => void;
    onChange?: () => void;
    // DOM Settings
    namespace?: string;
    selector?: {
      dimmable?: string,
      dimmer?: string,
      content?: string,
    };
    template?: {
      dimmer?: () => JQuery,
    };
    className?: {
      active?: string,
      dimmable?: string,
      dimmed?: string,
      disabled?: string,
      pageDimmer?: string,
      hide?: string,
      show?: string,
      transition?: string,
    };
    // DBG Settings
    name?: string;
    silent?: boolean;
    debug?: boolean;
    performance?: boolean;
    verbose?: boolean;
    error?: {
      method?: string,
    };
  }

  type DimmerBehavior = 'add content'
    | 'show'
    | 'hide'
    | 'toggle'
    | 'set opacity'
    | 'create'
    | 'get duration'
    | 'get dimmer'
    | 'has dimmer'
    | 'is active'
    | 'is animating'
    | 'is dimmer'
    | 'is dimmable'
    | 'is disabled'
    | 'is enabled'
    | 'is page'
    | 'is page dimmer'
    | 'set active'
    | 'set dimmable'
    | 'set dimmed'
    | 'set page dimmer'
    | 'set disabled'
    ;


  /*
   * Module: Dropdown
   */

  interface DropdownSettings {
    // Frequently Used Settings
    on?: 'hover' | 'click' | string;
    allowReselection?: boolean;
    allowAdditions?: boolean;
    hideAdditions?: boolean;
    action?: 'auto' | 'activate' | 'select' | 'combo' | 'nothing' | 'hide'
      | ((text: any, value: any) => any) // todo: add correct types to callback
    ;
    minCharacters?: number;
    match?: 'both' | 'value' | 'text';
    selectOnKeydown?: boolean;
    forceSelection?: boolean;
    allowCategorySelection?: boolean;
    placeholder?: 'auto' | 'value' | 'false';
    // Remote Settings
    apiSettings?: boolean | ApiSettings;
    fields?: {
      remoteValues?: string,
      values?: string,
      name?: string,
      value?: string,
    };
    saveRemoteData?: boolean;
    // Multiple Select Settings
    useLabels?: boolean;
    maxSelections?: boolean | number;
    glyphWidth?: number;
    label?: {
      transition?: AnimationName,
      duration?: AnimationDuration,
      variation?: boolean,
    };
    // Additional Settings
    direction?: 'auto' | 'upward' | 'downward';
    keepOnScreen?: boolean;
    context?: JQuerySelectorOrElement;
    fullTextSearch?: boolean;
    preserveHTML?: boolean;
    sortSelect?: boolean;
    showOnFocus?: boolean;
    allowTab?: boolean;
    transition?: 'auto' | AnimationName;
    duration?: number;
    keys?: { // keycodes - false to disable
      backspace?: number | boolean,
      delimiter?: number | boolean,
      deleteKey?: number | boolean,
      enter?: number | boolean,
      escape?: number | boolean,
      pageUp?: number | boolean,
      pageDown?: number | boolean,
      leftArrow?: number | boolean,
      upArrow?: number | boolean,
      rightArrow?: number | boolean,
      downArrow?: number | boolean,
    };
    delay?: {
      hide?: number,
      show?: number,
      search?: number,
      touch?: number,
    };
    // Callbacks
    onChange?: (value: any, text: string, $choice: JQuery) => void;
    onAdd?: (addedValue: any, addedText: string, $addedChoice: JQuery) => void;
    onRemove?: (removedValue: any, removedText: string, $removedChoice: JQuery) => void;
    onLabelCreate?: (value: any, text: string) => JQuery;
    onLabelRemove?: (value: any) => void | boolean;
    onLabelSelect?: ($selectedLabels: JQuery) => void;
    onNoResults?: (searchValue: string) => void;
    onShow?: () => void | boolean;
    onHide?: () => void | boolean;
    // DOM Settings
    namespace?: string;
    message?: {
      addResult?: string,
      count?: string,
      maxSelections?: string,
      noResults?: string,
    };
    selector?: {
      addition?: string,
      dropdown?: string,
      icon?: string,
      input?: string,
      item?: string,
      label?: string,
      remove?: string,
      siblingLabel?: string,
      menu?: string,
      message?: string,
      menuIcon?: string,
      search?: string,
      text?: string,
    };
    regExp?: {
      escape: RegExp,
    };
    metadata?: {
      defaultText?: string,
      defaultValue?: string,
      placeholderText?: string,
      text?: string,
      value?: string,
    };
    className?: {
      active?: string,
      addition?: string,
      animating?: string,
      disabled?: string,
      dropdown?: string,
      filtered?: string,
      hidden?: string,
      item?: string,
      label?: string,
      loading?: string,
      menu?: string,
      message?: string,
      multiple?: string,
      placeholder?: string,
      search?: string,
      selected?: string,
      selection?: string,
      upward?: string,
      visible?: string,
    };
    // DBG Settings
    name?: string;
    silent?: boolean;
    debug?: boolean;
    performance?: boolean;
    verbose?: boolean;
    error?: {
      action?: string,
      alreadySetup?: string,
      labels?: string,
      method?: string,
      noTransition?: string,
    };
  }

  type DropdownBehavior = 'setup menu'
    | 'refresh'
    | 'toggle'
    | 'show'
    | 'hide'
    | 'clear'
    | 'hide others'
    | 'restore defaults'
    | 'restore default text'
    | 'restore placeholder text'
    | 'restore default value'
    | 'save defaults'
    | 'set selected'
    | 'remove selected'
    | 'set selected'
    | 'set exactly'
    | 'set text'
    | 'set value'
    | 'get text'
    | 'get value'
    | 'get item'
    | 'bind touch events'
    | 'bind mouse events'
    | 'bind intent'
    | 'unbind intent'
    | 'determine intent'
    | 'determine select action'
    | 'set active'
    | 'set visible'
    | 'remove active'
    | 'remove visible'
    | 'is selection'
    | 'is animated'
    | 'is visible'
    | 'is hidden'
    | 'get default text'
    | 'get placeholder text'
    | 'destroy'
    ;


  /*
   * Module: Embed
   */

  interface EmbedSettings {
    icon?: boolean | string; // todo: examine
    source?: boolean | string;
    url?: boolean | string;
    id?: boolean | string;
    parameters?: boolean | Object;
    // Video Settings
    autoplay?: 'auto' | boolean;
    color?: string;
    hd?: boolean;
    brandedUI?: boolean;
    // Callbacks
    onCreate?: (url: string) => void;
    onDisplay?: () => void;
    onPlaceholderDisplay?: () => void;
    onEmbed?: (parameters: Object) => Object;
    // DOM Settings
    namespace?: string;
    selector?: {
      embed?: string,
      placeholder?: string,
      play?: string,
    };
    metadata?: {
      id?: string,
      icon?: string,
      placeholder?: string,
      source?: string,
      url?: string,
    };
    className?: {
      active?: string,
      embed?: string,
    };
    templates?: { // todo: here or under `$.fn.embed.settings.templates`???
      iframe?: (url: string, parameters?: string) => string,
      placeholder?: (imageUrl?: string, iconClass?: string) => string,
    };
    // DBG Settings
    name?: string;
    silent?: boolean;
    debug?: boolean;
    performance?: boolean;
    verbose?: boolean;
    error?: {
      noURL?: string,
      method?: string,
    };
  }

  type EmbedBehavior = 'change'
    | 'reset'
    | 'show'
    | 'hide'
    | 'get id'
    | 'get placeholder'
    | 'get sources'
    | 'get type'
    | 'get url'
    | 'has placeholder'
    | 'destroy'
    ;


  /*
   * Module: Modal
   */

  interface ModalSettings {
    detachable?: boolean;
    autofocus?: boolean;
    observeChanges?: boolean;
    allowMultiple?: boolean;
    keyboardShortcuts?: boolean;
    offset?: number;
    context?: string | JQuery;
    closable?: boolean;
    dimmerSettings?: {
      closable?: boolean;
      useCSS?: boolean;
    };
    transition?: AnimationName;
    duration?: AnimationDuration;
    queue?: boolean;
    // Callbacks
    onShow?: () => void;
    onVisible?: () => void;
    onHide?: ($element: JQuery) => boolean;
    onHidden?: () => void;
    onApprove?: ($element: JQuery) => boolean;
    onDeny?: ($element: JQuery) => boolean;
    // DOM Settings
    namespace?: string;
    selector?: {
      close?: string,
      approve?: string,
      deny?: string,
    };
    className?: {
      active?: string,
      scrolling?: string,
    };
    // DBG Settings
    name?: string;
    debug?: boolean;
    performance?: boolean;
    verbose?: boolean;
    error?: {
      method?: string,
    };
  }

  type ModalBehavior = 'show'
    | 'hide'
    | 'toggle'
    | 'refresh'
    | 'show dimmer'
    | 'hide dimmer'
    | 'hide others'
    | 'hide all'
    | 'cache sizes'
    | 'can fit'
    | 'is active'
    | 'set active'
    ;


  /*
   * Module: Nag
   */

  interface NagSettings {
    key?: string;
    value?: any;
  }

  type NagBehavior = 'show'
    | 'clear'
    ;


  /*
   * Module: Popup
   */

  interface PopupSettings {
    popup?: JQuerySelectorOrElement | boolean;
    exclusive?: boolean;
    movePopup?: boolean;
    observeChanges?: boolean;
    boundary?: JQuerySelectorOrElement;
    context?: JQuerySelectorOrElement;
    scrollContext?: JQuerySelectorOrElement;
    jitter?: number;
    position?: PopupPosition;
    inline?: boolean;
    preserve?: boolean;
    prefer?: 'adjacent' | 'opposite';
    lastResort?: PopupPosition | boolean;
    on?: 'focus' | 'click' | 'hover' | 'manual';
    delay?: number | {
      show?: number,
      hide?: number,
    };
    transition?: AnimationName;
    duration?: AnimationDuration;
    setFluidWidth?: boolean;
    hoverable?: boolean;
    closable?: boolean;
    addTouchEvents?: boolean;
    hideOnScroll?: 'auto' | boolean;
    target?: JQuerySelectorOrElement | boolean;
    distanceAway?: number;
    offset?: number;
    maxSearchDepth?: number;
    // Callbacks
    onCreate?: ($module: JQuery) => void;
    onRemove?: ($module: JQuery) => void;
    onShow?: ($module: JQuery) => boolean;
    onVisible?: ($module: JQuery) => void;
    onHide?: ($module: JQuery) => boolean;
    onHidden?: ($module: JQuery) => void;
    onUnplaceable?: ($module: JQuery) => void;
    // Content Settings
    variation?: string;
    content?: string;
    title?: string;
    html?: string;
    // DOM Settings
    selector?: {
      popup?: string,
    };
    metadata?: {
      content?: string,
      html?: string,
      offset?: string,
      position?: string,
      title?: string,
      variation?: string,
    };
    className?: {
      loading?: string,
      popup?: string,
      position?: string,
      visible?: string,
    };
    // DBG Settings
    name?: string;
    silent?: boolean;
    debug?: boolean;
    performance?: boolean;
    verbose?: boolean;
    errors?: {
      invalidPosition?: string,
      cannotPlace?: string,
      method?: string,
      noTransition?: string,
      notFound?: string,
    };
  }

  type PopupBehavior = 'show'
    | 'hide'
    | 'hide all'
    | 'get popup'
    | 'change content'
    | 'toggle'
    | 'is visible'
    | 'is hidden'
    | 'exists'
    | 'reposition'
    | 'set position'
    | 'destroy'
    | 'remove popup'
    ;

  type PopupPosition = 'top left'
    | 'top center'
    | 'top right'
    | 'bottom left'
    | 'bottom center'
    | 'bottom right'
    | 'right center'
    | 'left center'
    ;


  /*
   * Module: Progress
   */

  interface ProgressSettings {
    autoSuccess?: boolean;
    showActivity?: boolean;
    limitValues?: boolean;
    label?: 'percent' | 'ratio';
    random?: {
      min: number,
      max: number,
    };
    duration?: AnimationDuration;
    updateInterval?: 'auto' | number;
    precision?: number;
    framerate?: number;
    percent?: number | boolean;
    total?: number | boolean;
    value?: number | boolean;
    // Callbacks
    onChange?: (percent: number, value: number, total?: number) => void;
    onSuccess?: (total?: number) => void;
    onActive?: (value: number, total?: number) => void;
    onError?: (value: number, total?: number) => void;
    onWarning?: (value: number, total?: number) => void;
    onLabelUpdate?: (state, text, value, total) => string;
    // DOM Settings
    namespace?: string;
    text?: {
      active?: string | boolean,
      error?: string | boolean,
      success?: string | boolean,
      warning?: string | boolean,
      percent?: string | boolean,
      ratio?: string | boolean,
    };
    regExp?: {
      variable: RegExp,
    };
    selector?: {
      bar?: string,
      label?: string,
      progress?: string,
    };
    metadata?: {
      percent?: string,
      total?: string,
      value?: string,
    };
    className?: {
      active?: string,
      error?: string,
      success?: string,
      warning?: string,
    };
    // DBG Settings
    name?: string;
    silent?: boolean;
    debug?: boolean;
    performance?: boolean;
    verbose?: boolean;
    errors?: {
      method?: string,
      nonNumeric?: string,
      tooHigh?: string,
      tooLow?: string,
    };
  }


  type ProgressBehavior = 'set percent'
    | 'set progress'
    | 'increment'
    | 'decrement'
    | 'update progress'
    | 'complete'
    | 'reset'
    | 'set total'
    | 'get text'
    | 'get normalized value'
    | 'get percent'
    | 'get value'
    | 'get total'
    | 'is complete'
    | 'is success'
    | 'is warning'
    | 'is error'
    | 'is active'
    | 'set active'
    | 'set warning'
    | 'set success'
    | 'set error'
    | 'set duration'
    | 'set label'
    | 'set bar label'
    | 'remove active'
    | 'remove warning'
    | 'remove success'
    | 'remove error'
    ;


  /*
   * Module: Rating
   */

  interface RatingSettings {
    initialRating?: number;
    fireOnInit?: boolean;
    clearable?: boolean | 'auto';
    interactive?: boolean;
    // Callbacks
    onRate?: (value: number) => void;
    // DOM Settings
    namespace?: string;
    selector: {
      icon?: string,
    };
    className?: {
      active?: string,
      hover?: string,
      loading?: string,
    };
    // DBG Settings
    name?: string;
    silent?: boolean;
    debug?: boolean;
    performance?: boolean;
    verbose?: boolean;
    error?: {
      action?: string,
    };
  }


  type RatingBehavior = 'set rating'
    | 'get rating'
    | 'disable'
    | 'enable'
    | 'clear rating'
    ;


  /*
   * Module: Search
   */

  interface SearchSettings {
    apiSettings?: ApiSettings;
    minCharacters?: number;
    transition?: AnimationName;
    duration?: AnimationDuration;
    maxResults?: number;
    cache?: boolean;
    source?: any[] | Object;
    selectFirstResult?: boolean;
    showNoResults?: boolean;
    searchFullText?: boolean;
    fields?: {
      categories?: string,
      categoryName?: string,
      categoryResults?: string,
      description?: string,
      image?: string,
      price?: string,
      results?: string,
      title?: string,
      url?: string,
      action?: string,
      actionText?: string,
      actionURL?: string,
    };
    searchFields?: string[];
    hideDelay?: number;
    searchDelay?: number;
    easing?: string;
    // Callbacks
    onSelect?: boolean | ((result: any, response: Object) => void | boolean); // todo: result type
    onResultsAdd?: boolean | ((html: string) => void | boolean);
    onSearchQuery?: (query: string) => void;
    onResults?: (response: Object) => void;
    onResultsOpen?: () => void;
    onResultsClose?: () => void;
    // DOM Settings
    templates?: { // todo: here or under `$.fn.search.settings.templates`???
      escape?: (str: string) => string;
      message?: (message?: string, type?: string) => string;
      category?: (response: Object, fields: Object) => string;
      standard?: (response: Object) => string;
    };
    namespace?: string;
    regExp?: {
      escape?: RegExp,
      beginsWith?: string,
    };
    selector?: {
      prompt?: string,
      searchButton?: string,
      results?: string,
      message?: string,
      category?: string,
      result?: string,
      title?: string,
    };
    metadata?: {
      cache?: string,
      results?: string,
    };
    className?: {
      active?: string,
      empty?: string,
      focus?: string,
      loading?: string,
      pressed?: string,
    };
    // DBG Settings
    name?: string;
    silent?: boolean;
    debug?: boolean;
    performance?: boolean;
    verbose?: boolean;
    error?: {
      source?: string,
      noResults?: string,
      logging?: string,
      noTemplate?: string,
      serverError?: string,
      maxResults?: string,
      method?: string,
    };
  }

  type SearchBehavior = 'query'
    | 'display message'
    | 'cancel query'
    | 'search local'
    | 'has minimum characters'
    | 'search remote'
    | 'search object'
    | 'cancel query'
    | 'is focused'
    | 'is visible'
    | 'is empty'
    | 'get value'
    | 'get result'
    | 'set value'
    | 'read cache'
    | 'clear cache'
    | 'write cache'
    | 'add results'
    | 'show results'
    | 'hide results'
    | 'generate results(response)'
    | 'destroy'
    ;


  /*
   * Module: Shape
   */

  interface ShapeSettings {
    duration?: AnimationDuration;
    width?: number | 'next' | 'initial';
    height?: number | 'next' | 'initial';
    // Callbacks
    beforeChange?: () => void;
    onChange?: () => void;
    // DOM Settings
    namespace?: string;
    selector?: {
      sides?: string,
      side?: string,
    };
    className?: {
      animating?: string,
      hidden?: string,
      loading?: string,
      active?: string,
    };
    // DBG Settings
    name?: string;
    silent?: boolean;
    debug?: boolean;
    performance?: boolean;
    verbose?: boolean;
    error?: {
      side?: string,
      method?: string,
    };
  }

  type ShapeBehavior = 'flip up'
    | 'flip down'
    | 'flip right'
    | 'flip left'
    | 'flip over'
    | 'flip back'
    | 'set next side'
    | 'is animating'
    | 'reset'
    | 'queue'
    | 'repaint'
    | 'set default side'
    | 'set stage size'
    | 'refresh'
    | 'get transform down'
    | 'get transform left'
    | 'get transform right'
    | 'get transform up'
    | 'get transform down'
    ;


  /*
   * Module: Sidebar
   */

  interface SidebarSettings {
    context?: JQuerySelectorOrElement;
    exclusive?: boolean;
    closable?: boolean;
    dimPage?: boolean;
    scrollLock?: boolean;
    returnScroll?: boolean;
    delaySetup?: boolean;
    // Animation
    transition?: AnimationName | 'auto' | 'uncover' | 'overlay';
    mobileTransition?: AnimationName | 'auto' | 'uncover' | 'overlay';
    defaultTransition?: {
      computer?: {
        left?: AnimationName | 'uncover' | 'overlay',
        right?: AnimationName | 'uncover' | 'overlay',
        top?: AnimationName | 'uncover' | 'overlay',
        bottom?: AnimationName | 'uncover' | 'overlay',
      },
      mobile?: {
        left?: AnimationName | 'uncover' | 'overlay',
        right?: AnimationName | 'uncover' | 'overlay',
        top?: AnimationName | 'uncover' | 'overlay',
        bottom?: AnimationName | 'uncover' | 'overlay',
      },
    };
    useLegacy?: boolean | 'auto';
    easing?: 'easeInOutQuint' | string;
    // Callbacks
    onVisible?: () => void;
    onShow?: () => void;
    onChange?: () => void;
    onHide?: () => void;
    onHidden?: () => void;
    // DOM Settings
    namespace?: string;
    selector?: {
      fixed?: string,
      omitted?: string,
      pusher?: string,
      sidebar?: string,
    };
    className?: {
      active?: string,
      animating?: string,
      dimmed?: string,
      ios?: string,
      pushable?: string,
      pushed?: string,
      right?: string,
      top?: string,
      left?: string,
      bottom?: string,
      visible?: string,
    };
    regExp: {
      ios?: RegExp,
      mobileChrome?: RegExp,
      mobile?: RegExp,
    };
    // DBG Settings
    name?: string;
    silent?: boolean;
    debug?: boolean;
    performance?: boolean;
    verbose?: boolean;
    error?: {
      method?: string,
      pusher?: string,
      movedSidebar?: string,
      overlay?: string,
      notFound?: string,
    };
  }

  type SidebarBehavior = 'show'
    | 'hide'
    | 'toggle'
    | 'is visible'
    | 'is hidden'
    | 'push page'
    | 'get direction'
    | 'pull page'
    | 'add body CSS'
    | 'remove body CSS'
    | 'get transition event'
    ;


  /*
   * Module: Sticky
   */

  interface StickySettings {
    pushing?: boolean;
    jitter?: number;
    observeChanges?: boolean;
    context?: boolean | JQuerySelectorOrElement;
    scrollContext?: JQuerySelectorOrElement;
    offset?: number;
    bottomOffset?: number;
    // Callbacks
    onReposition?: () => void;
    onScroll?: () => void;
    onStick?: () => void;
    onUnstick?: () => void;
    onTop?: () => void;
    onBottom?: () => void;
    // DOM Settings
    namespace?: string;
    className?: {
      bound?: string,
      fixed?: string,
      supported?: string,
      top?: string,
      bottom?: string,
    };
    // DBG Settings
    name?: string;
    silent?: boolean;
    debug?: boolean;
    performance?: boolean;
    verbose?: boolean;
    error?: {
      container?: string,
      visible?: string,
      method?: string,
      invalidContext?: string,
      elementSize?: string,
    };
  }

  type StickyBehavior = 'refresh'
    ;


  /*
   * Module: Tab
   */

  interface TabSettings {
    auto?: boolean;
    history?: boolean;
    ignoreFirstLoad?: boolean;
    evaluateScripts?: 'once' | boolean;
    alwaysRefresh?: boolean;
    deactivate?: 'siblings' | 'all';
    cacheType?: 'response' | 'html';
    cache?: boolean;
    apiSettings?: boolean | ApiSettings;
    historyType?: 'hash' | 'state';
    path?: boolean | string;
    context?: boolean | JQuerySelectorOrElement;
    childrenOnly?: boolean;
    maxDepth?: number;
    // Callbacks
    onFirstLoad?: (tabPath: string, parameterArray: string[], historyEvent: JQueryEventObject) => void;
    onLoad?: (tabPath: string, parameterArray: string[], historyEvent: JQueryEventObject) => void;
    onRequest?: (tabPath: string) => void;
    onVisible?: (tabPath: string) => void;
    // DOM Settings
    namespace?: string;
    templates?: {
      determineTitle?: (tabPath: string) => string,
    };
    selector?: {
      tabs?: string,
      ui?: string,
    };
    metadata?: {
      tab?: string,
      loaded?: string,
      promise?: string,
    };
    className?: {
      loading?: string,
      active?: string,
    };
    // DBG Settings
    name?: string;
    silent?: boolean;
    debug?: boolean;
    performance?: boolean;
    verbose?: boolean;
    error?: {
      api?: string,
      method?: string,
      missingTab?: string,
      noContent?: string,
      path?: string,
      recursion?: string,
      legacyInit?: string,
      legacyLoad?: string,
      state?: string,
    };
  }

  type TabBehavior = 'change tab'
    | 'set state'
    | 'get path'
    | 'is tab'
    | 'cache read'
    | 'cache add'
    | 'cache remove'
    ;


  /*
   * Module: Transitions
   */

  interface TransitionSettings {
    animation?: AnimationName;
    interval?: number;
    reverse?: boolean | 'auto';
    displayType?: boolean;
    duration?: AnimationDuration;
    useFailSafe?: boolean;
    allowRepeats?: boolean;
    queue?: boolean;
    // Callbacks
    onShow?: () => void;
    onHide?: () => void;
    onStart?: () => void;
    onComplete?: () => void;
    // DOM Settings
    namespace?: string;
    className?: {
      animating?: string,
      disabled?: string,
      hidden?: string,
      inward?: string,
      loading?: string,
      looping?: string,
      outward?: string,
      transition?: string,
      visible?: string,
    };
    // DBG Settings
    name?: string;
    silent?: boolean;
    debug?: boolean;
    performance?: boolean;
    verbose?: boolean;
    errors?: {
      noAnimation?: string,
      method?: string,
    };
  }

  type TransitionBehavior = 'stop'
    | 'stop all'
    | 'clear queue'
    | 'show'
    | 'hide'
    | 'toggle'
    | 'force repaint'
    | 'repaint'
    | 'reset'
    | 'looping'
    | 'remove looping'
    | 'disable'
    | 'enable'
    | 'set duration(duration)'
    | 'save conditions'
    | 'restore conditions'
    | 'get animation name'
    | 'get animation event'
    | 'is visible'
    | 'is animating'
    | 'is looping'
    | 'is supported'
    ;

}


interface JQuery {

  // Behaviors

  api(command: 'setting', key: string, value: any): JQuery;
  api(command: 'setting', settings: SemanticUI.ApiSettings): JQuery;
  api(behavior: SemanticUI.ApiBehavior, ...args: any[]): JQuery;
  api(settings?: SemanticUI.ApiSettings): JQuery;

  form(command: 'setting', key: string, value: any): JQuery;
  form(command: 'setting', settings: SemanticUI.FormSettings): JQuery;
  form(behavior: SemanticUI.FormBehavior, ...args: any[]): JQuery;
  form(settings?: SemanticUI.FormSettings): JQuery;

  visibility(command: 'setting', key: string, value: any): JQuery;
  visibility(command: 'setting', settings: SemanticUI.VisibilitySettings): JQuery;
  visibility(behavior: SemanticUI.VisibilityBehavior, ...args: any[]): JQuery;
  visibility(settings?: SemanticUI.VisibilitySettings): JQuery;


  // Modules

  accordion(command: 'setting', key: string, value: any): JQuery;
  accordion(command: 'setting', settings: SemanticUI.AccordionSettings): JQuery;
  accordion(behavior: SemanticUI.AccordionBehavior, ...args: any[]): JQuery;
  accordion(settings?: SemanticUI.AccordionSettings): JQuery;

  checkbox(
    command: 'attach events', selector: SemanticUI.JQuerySelectorOrElement,
    behavior?: SemanticUI.CheckboxBehavior,
  ): JQuery;
  checkbox(command: 'setting', key: string, value: any): JQuery;
  checkbox(command: 'setting', settings: SemanticUI.CheckboxSettings): JQuery;
  checkbox(behavior: SemanticUI.CheckboxBehavior, ...args: any[]): JQuery;
  checkbox(settings?: SemanticUI.CheckboxSettings): JQuery;

  dimmer(command: 'setting', key: string, value: any): JQuery;
  dimmer(command: 'setting', settings: SemanticUI.DimmerSettings): JQuery;
  dimmer(behavior: SemanticUI.DimmerBehavior, ...args: any[]): JQuery;
  dimmer(settings?: SemanticUI.DimmerSettings): JQuery;

  dropdown(command: 'setting', key: string, value: any): JQuery;
  dropdown(command: 'setting', settings: SemanticUI.DropdownSettings): JQuery;
  dropdown(behavior: SemanticUI.DropdownBehavior, ...args: any[]): JQuery;
  dropdown(settings?: SemanticUI.DropdownSettings): JQuery;

  embed(command: 'setting', key: string, value: any): JQuery;
  embed(command: 'setting', settings: SemanticUI.EmbedSettings): JQuery;
  embed(behavior: SemanticUI.EmbedBehavior, ...args: any[]): JQuery;
  embed(settings?: SemanticUI.EmbedSettings): JQuery;

  modal(
    command: 'attach events', selector: SemanticUI.JQuerySelectorOrElement,
    behavior?: SemanticUI.ModalBehavior,
  ): JQuery;
  modal(command: 'setting', key: string, value: any): JQuery;
  modal(command: 'setting', settings: SemanticUI.ModalSettings): JQuery;
  modal(behavior: SemanticUI.ModalBehavior, ...args: any[]): JQuery;
  modal(settings?: SemanticUI.ModalSettings): JQuery;

  nag(command: 'setting', key: string, value: any): JQuery;
  nag(command: 'setting', settings: SemanticUI.NagSettings): JQuery;
  nag(behavior: SemanticUI.NagBehavior, ...args: any[]): JQuery;
  nag(settings?: SemanticUI.NagSettings): JQuery;

  popup(command: 'setting', key: string, value: any): JQuery;
  popup(command: 'setting', settings: SemanticUI.PopupSettings): JQuery;
  popup(behavior: SemanticUI.PopupBehavior, ...args: any[]): JQuery;
  popup(settings?: SemanticUI.PopupSettings): JQuery;

  progress(command: 'setting', key: string, value: any): JQuery;
  progress(command: 'setting', settings: SemanticUI.ProgressSettings): JQuery;
  progress(behavior: SemanticUI.ProgressBehavior, ...args: any[]): JQuery;
  progress(settings?: SemanticUI.ProgressSettings): JQuery;

  rating(command: 'setting', key: string, value: any): JQuery;
  rating(command: 'setting', settings: SemanticUI.RatingSettings): JQuery;
  rating(behavior: SemanticUI.RatingBehavior, ...args: any[]): JQuery;
  rating(settings?: SemanticUI.RatingSettings): JQuery;

  search(command: 'setting', key: string, value: any): JQuery;
  search(command: 'setting', settings: SemanticUI.SearchSettings): JQuery;
  search(behavior: SemanticUI.SearchBehavior, ...args: any[]): JQuery;
  search(settings?: SemanticUI.SearchSettings): JQuery;

  shape(command: 'setting', key: string, value: any): JQuery;
  shape(command: 'setting', settings: SemanticUI.ShapeSettings): JQuery;
  shape(behavior: SemanticUI.ShapeBehavior, ...args: any[]): JQuery;
  shape(settings?: SemanticUI.ShapeSettings): JQuery;

  sidebar(
    command: 'attach events', selector: SemanticUI.JQuerySelectorOrElement,
    behavior?: SemanticUI.SidebarBehavior,
  ): JQuery;
  sidebar(command: 'setting', key: string, value: any): JQuery;
  sidebar(command: 'setting', settings: SemanticUI.SidebarSettings): JQuery;
  sidebar(behavior: SemanticUI.SidebarBehavior, ...args: any[]): JQuery;
  sidebar(settings?: SemanticUI.SidebarSettings): JQuery;

  sticky(command: 'setting', key: string, value: any): JQuery;
  sticky(command: 'setting', settings: SemanticUI.StickySettings): JQuery;
  sticky(behavior: SemanticUI.StickyBehavior, ...args: any[]): JQuery;
  sticky(settings?: SemanticUI.StickySettings): JQuery;

  tab(
    command: 'attach events', selector: SemanticUI.JQuerySelectorOrElement,
    behavior?: SemanticUI.TabBehavior,
  ): JQuery;
  tab(command: 'setting', key: string, value: any): JQuery;
  tab(command: 'setting', settings: SemanticUI.TabSettings): JQuery;
  tab(behavior: SemanticUI.TabBehavior, ...args: any[]): JQuery;
  tab(settings?: SemanticUI.TabSettings): JQuery;

  transition(animation: SemanticUI.AnimationName, duration: SemanticUI.AnimationDuration, onComplete: Function): JQuery;
  transition(animation: SemanticUI.AnimationName, duration: SemanticUI.AnimationDuration): JQuery;
  transition(animation: SemanticUI.AnimationName, onComplete: Function): JQuery;
  transition(animation: SemanticUI.AnimationName, settings: SemanticUI.TransitionSettings): JQuery;
  transition(animation: SemanticUI.AnimationName): JQuery;
  transition(command: 'setting', key: string, value: any): JQuery;
  transition(command: 'setting', settings: SemanticUI.TransitionSettings): JQuery;
  transition(behavior: SemanticUI.TransitionBehavior, ...args: any[]): JQuery;
  transition(settings?: SemanticUI.TransitionSettings): JQuery;

}