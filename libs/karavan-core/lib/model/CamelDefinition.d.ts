import { CamelElement } from "./IntegrationDefinition";
export declare class ProcessorDefinition extends CamelElement {
    stepName?: string;
    aggregate?: AggregateDefinition;
    bean?: BeanDefinition | string;
    doCatch?: CatchDefinition;
    choice?: ChoiceDefinition;
    circuitBreaker?: CircuitBreakerDefinition;
    claimCheck?: ClaimCheckDefinition;
    convertBodyTo?: ConvertBodyDefinition | string;
    convertHeaderTo?: ConvertHeaderDefinition;
    convertVariableTo?: ConvertVariableDefinition;
    delay?: DelayDefinition;
    dynamicRouter?: DynamicRouterDefinition;
    enrich?: EnrichDefinition;
    filter?: FilterDefinition;
    doFinally?: FinallyDefinition;
    idempotentConsumer?: IdempotentConsumerDefinition;
    kamelet?: KameletDefinition | string;
    loadBalance?: LoadBalanceDefinition;
    log?: LogDefinition | string;
    loop?: LoopDefinition;
    marshal?: MarshalDefinition;
    multicast?: MulticastDefinition;
    pausable?: PausableDefinition;
    pipeline?: PipelineDefinition;
    policy?: PolicyDefinition;
    poll?: PollDefinition | string;
    pollEnrich?: PollEnrichDefinition;
    process?: ProcessDefinition;
    recipientList?: RecipientListDefinition;
    removeHeader?: RemoveHeaderDefinition | string;
    removeHeaders?: RemoveHeadersDefinition | string;
    removeProperties?: RemovePropertiesDefinition | string;
    removeProperty?: RemovePropertyDefinition | string;
    removeVariable?: RemoveVariableDefinition | string;
    resequence?: ResequenceDefinition;
    resumable?: ResumableDefinition;
    rollback?: RollbackDefinition | string;
    routingSlip?: RoutingSlipDefinition | string;
    saga?: SagaDefinition;
    sample?: SamplingDefinition | string;
    script?: ScriptDefinition;
    setBody?: SetBodyDefinition;
    setExchangePattern?: SetExchangePatternDefinition | string;
    setHeader?: SetHeaderDefinition;
    setHeaders?: SetHeadersDefinition;
    setProperty?: SetPropertyDefinition;
    setVariable?: SetVariableDefinition;
    setVariables?: SetVariablesDefinition;
    sort?: SortDefinition;
    split?: SplitDefinition;
    step?: StepDefinition;
    stop?: StopDefinition;
    threads?: ThreadsDefinition;
    throttle?: ThrottleDefinition;
    throwException?: ThrowExceptionDefinition;
    to?: string;
    toD?: string;
    tokenizer?: TokenizerDefinition;
    transacted?: TransactedDefinition;
    transform?: TransformDefinition;
    doTry?: TryDefinition;
    unmarshal?: UnmarshalDefinition;
    validate?: ValidateDefinition;
    wireTap?: WireTapDefinition;
    constructor(init?: Partial<ProcessorDefinition>);
}
export declare class BeansDeserializer extends CamelElement {
    constructor(init?: Partial<BeansDeserializer>);
}
export declare class DataFormatsDefinitionDeserializer extends CamelElement {
    constructor(init?: Partial<DataFormatsDefinitionDeserializer>);
}
export declare class ErrorHandlerDeserializer extends CamelElement {
    deadLetterChannel?: DeadLetterChannelDefinition;
    defaultErrorHandler?: DefaultErrorHandlerDefinition;
    jtaTransactionErrorHandler?: JtaTransactionErrorHandlerDefinition;
    noErrorHandler?: NoErrorHandlerDefinition;
    refErrorHandler?: RefErrorHandlerDefinition | string;
    springTransactionErrorHandler?: SpringTransactionErrorHandlerDefinition;
    id?: string;
    constructor(init?: Partial<ErrorHandlerDeserializer>);
}
export declare class OutputAwareFromDefinition extends CamelElement {
    stepName?: string;
    description?: string;
    id?: string;
    parameters?: any;
    steps: CamelElement[];
    uri: string;
    variableReceive?: string;
    constructor(init?: Partial<OutputAwareFromDefinition>);
}
export declare class AggregateDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    correlationExpression?: ExpressionSubElementDefinition;
    completionPredicate?: ExpressionSubElementDefinition;
    completionTimeoutExpression?: ExpressionSubElementDefinition;
    completionSizeExpression?: ExpressionSubElementDefinition;
    optimisticLockRetryPolicy?: OptimisticLockRetryPolicyDefinition;
    parallelProcessing?: boolean;
    optimisticLocking?: boolean;
    executorService?: string;
    timeoutCheckerExecutorService?: string;
    aggregateController?: string;
    aggregationRepository?: string;
    aggregationStrategy: string;
    aggregationStrategyMethodName?: string;
    aggregationStrategyMethodAllowNull?: boolean;
    completionSize?: number;
    completionInterval?: string;
    completionTimeout?: string;
    completionTimeoutCheckerInterval?: string;
    completionFromBatchConsumer?: boolean;
    completionOnNewCorrelationGroup?: boolean;
    eagerCheckCompletion?: boolean;
    ignoreInvalidCorrelationKeys?: boolean;
    closeCorrelationKeyOnCompletion?: number;
    discardOnCompletionTimeout?: boolean;
    discardOnAggregationFailure?: boolean;
    forceCompletionOnStop?: boolean;
    completeAllOnStop?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<AggregateDefinition>);
}
export declare class BeanDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    ref?: string;
    method?: string;
    beanType?: string;
    scope?: string;
    constructor(init?: Partial<BeanDefinition>);
}
export declare class BeanFactoryDefinition extends CamelElement {
    stepName?: string;
    name: string;
    type: string;
    initMethod?: string;
    destroyMethod?: string;
    factoryMethod?: string;
    factoryBean?: string;
    builderClass?: string;
    builderMethod?: string;
    scriptLanguage?: string;
    constructors?: any;
    properties?: any;
    script?: string;
    constructor(init?: Partial<BeanFactoryDefinition>);
}
export declare class CatchDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    exception?: string[];
    onWhen?: OnWhenDefinition;
    steps?: CamelElement[];
    constructor(init?: Partial<CatchDefinition>);
}
export declare class ChoiceDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    when?: WhenDefinition[];
    otherwise?: OtherwiseDefinition;
    precondition?: boolean;
    constructor(init?: Partial<ChoiceDefinition>);
}
export declare class CircuitBreakerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    configuration?: string;
    resilience4jConfiguration?: Resilience4jConfigurationDefinition;
    faultToleranceConfiguration?: FaultToleranceConfigurationDefinition;
    onFallback?: OnFallbackDefinition;
    steps?: CamelElement[];
    constructor(init?: Partial<CircuitBreakerDefinition>);
}
export declare class ClaimCheckDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    operation?: string;
    key?: string;
    filter?: string;
    aggregationStrategy?: string;
    aggregationStrategyMethodName?: string;
    constructor(init?: Partial<ClaimCheckDefinition>);
}
export declare class ContextScanDefinition extends CamelElement {
    stepName?: string;
    includeNonSingletons?: boolean;
    excludes?: string[];
    includes?: string[];
    constructor(init?: Partial<ContextScanDefinition>);
}
export declare class ConvertBodyDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    type: string;
    mandatory?: boolean;
    charset?: string;
    constructor(init?: Partial<ConvertBodyDefinition>);
}
export declare class ConvertHeaderDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    name: string;
    type: string;
    toName?: string;
    mandatory?: boolean;
    charset?: string;
    constructor(init?: Partial<ConvertHeaderDefinition>);
}
export declare class ConvertVariableDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    name: string;
    type: string;
    toName?: string;
    mandatory?: boolean;
    charset?: string;
    constructor(init?: Partial<ConvertVariableDefinition>);
}
export declare class DataFormatDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    constructor(init?: Partial<DataFormatDefinition>);
}
export declare class DelayDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    expression?: ExpressionDefinition;
    asyncDelayed?: boolean;
    callerRunsWhenRejected?: boolean;
    executorService?: string;
    constructor(init?: Partial<DelayDefinition>);
}
export declare class DynamicRouterDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    expression?: ExpressionDefinition;
    uriDelimiter?: string;
    ignoreInvalidEndpoints?: boolean;
    cacheSize?: number;
    constructor(init?: Partial<DynamicRouterDefinition>);
}
export declare class EnrichDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    expression?: ExpressionDefinition;
    variableSend?: string;
    variableReceive?: string;
    aggregationStrategy?: string;
    aggregationStrategyMethodName?: string;
    aggregationStrategyMethodAllowNull?: string;
    aggregateOnException?: boolean;
    shareUnitOfWork?: boolean;
    cacheSize?: number;
    ignoreInvalidEndpoint?: boolean;
    allowOptimisedComponents?: boolean;
    autoStartComponents?: boolean;
    constructor(init?: Partial<EnrichDefinition>);
}
export declare class ErrorHandlerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    deadLetterChannel?: DeadLetterChannelDefinition;
    defaultErrorHandler?: DefaultErrorHandlerDefinition;
    jtaTransactionErrorHandler?: JtaTransactionErrorHandlerDefinition;
    noErrorHandler?: NoErrorHandlerDefinition;
    refErrorHandler?: RefErrorHandlerDefinition | string;
    springTransactionErrorHandler?: SpringTransactionErrorHandlerDefinition;
    constructor(init?: Partial<ErrorHandlerDefinition>);
}
export declare class ExpressionSubElementDefinition extends CamelElement {
    stepName?: string;
    constant?: ConstantExpression | string;
    csimple?: CSimpleExpression | string;
    datasonnet?: DatasonnetExpression | string;
    exchangeProperty?: ExchangePropertyExpression | string;
    groovy?: GroovyExpression | string;
    header?: HeaderExpression | string;
    hl7terser?: Hl7TerserExpression | string;
    java?: JavaExpression | string;
    jq?: JqExpression | string;
    js?: JavaScriptExpression | string;
    jsonpath?: JsonPathExpression | string;
    language?: LanguageExpression;
    method?: MethodCallExpression | string;
    mvel?: MvelExpression | string;
    ognl?: OgnlExpression | string;
    python?: PythonExpression | string;
    ref?: RefExpression | string;
    simple?: SimpleExpression | string;
    spel?: SpELExpression | string;
    tokenize?: TokenizerExpression | string;
    variable?: VariableExpression | string;
    wasm?: WasmExpression | string;
    xpath?: XPathExpression | string;
    xquery?: XQueryExpression | string;
    xtokenize?: XMLTokenizerExpression | string;
    constructor(init?: Partial<ExpressionSubElementDefinition>);
}
export declare class FaultToleranceConfigurationDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    circuitBreaker?: string;
    delay?: string;
    successThreshold?: number;
    requestVolumeThreshold?: number;
    failureRatio?: number;
    timeoutEnabled?: boolean;
    timeoutDuration?: string;
    timeoutPoolSize?: number;
    timeoutScheduledExecutorService?: string;
    bulkheadEnabled?: boolean;
    bulkheadMaxConcurrentCalls?: number;
    bulkheadWaitingTaskQueue?: number;
    bulkheadExecutorService?: string;
    constructor(init?: Partial<FaultToleranceConfigurationDefinition>);
}
export declare class FilterDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    expression?: ExpressionDefinition;
    statusPropertyName?: string;
    steps?: CamelElement[];
    constructor(init?: Partial<FilterDefinition>);
}
export declare class FinallyDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<FinallyDefinition>);
}
export declare class FromDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    uri: string;
    variableReceive?: string;
    parameters?: any;
    steps: CamelElement[];
    constructor(init?: Partial<FromDefinition>);
}
export declare class GlobalOptionDefinition extends CamelElement {
    stepName?: string;
    key: string;
    value: string;
    constructor(init?: Partial<GlobalOptionDefinition>);
}
export declare class GlobalOptionsDefinition extends CamelElement {
    stepName?: string;
    globalOption?: GlobalOptionDefinition[];
    constructor(init?: Partial<GlobalOptionsDefinition>);
}
export declare class IdempotentConsumerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    expression?: ExpressionDefinition;
    idempotentRepository: string;
    eager?: boolean;
    completionEager?: boolean;
    skipDuplicate?: boolean;
    removeOnFailure?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<IdempotentConsumerDefinition>);
}
export declare class InputTypeDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    urn: string;
    validate?: boolean;
    constructor(init?: Partial<InputTypeDefinition>);
}
export declare class InterceptDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    onWhen?: OnWhenDefinition;
    steps?: CamelElement[];
    constructor(init?: Partial<InterceptDefinition>);
}
export declare class InterceptFromDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    uri?: string;
    onWhen?: OnWhenDefinition;
    steps?: CamelElement[];
    constructor(init?: Partial<InterceptFromDefinition>);
}
export declare class InterceptSendToEndpointDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    uri: string;
    skipSendToOriginalEndpoint?: string;
    afterUri?: string;
    onWhen?: OnWhenDefinition;
    steps?: CamelElement[];
    constructor(init?: Partial<InterceptSendToEndpointDefinition>);
}
export declare class KameletDefinition extends CamelElement {
    stepName?: string;
    name: string;
    parameters?: any;
    constructor(init?: Partial<KameletDefinition>);
}
export declare class LoadBalanceDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    customLoadBalancer?: CustomLoadBalancerDefinition | string;
    failoverLoadBalancer?: FailoverLoadBalancerDefinition;
    randomLoadBalancer?: RandomLoadBalancerDefinition;
    roundRobinLoadBalancer?: RoundRobinLoadBalancerDefinition;
    stickyLoadBalancer?: StickyLoadBalancerDefinition;
    topicLoadBalancer?: TopicLoadBalancerDefinition;
    weightedLoadBalancer?: WeightedLoadBalancerDefinition;
    steps?: CamelElement[];
    constructor(init?: Partial<LoadBalanceDefinition>);
}
export declare class LogDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    message: string;
    loggingLevel?: string;
    logName?: string;
    marker?: string;
    logger?: string;
    logLanguage?: string;
    constructor(init?: Partial<LogDefinition>);
}
export declare class LoopDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    expression?: ExpressionDefinition;
    copy?: boolean;
    doWhile?: boolean;
    breakOnShutdown?: boolean;
    onPrepare?: string;
    steps?: CamelElement[];
    constructor(init?: Partial<LoopDefinition>);
}
export declare class MarshalDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    variableSend?: string;
    variableReceive?: string;
    asn1?: ASN1DataFormat | string;
    avro?: AvroDataFormat | string;
    barcode?: BarcodeDataFormat;
    base64?: Base64DataFormat;
    beanio?: BeanioDataFormat;
    bindy?: BindyDataFormat;
    cbor?: CBORDataFormat;
    crypto?: CryptoDataFormat;
    csv?: CsvDataFormat | string;
    custom?: CustomDataFormat | string;
    fhirJson?: FhirJsonDataFormat;
    fhirXml?: FhirXmlDataFormat;
    flatpack?: FlatpackDataFormat;
    fury?: FuryDataFormat;
    grok?: GrokDataFormat;
    gzipDeflater?: GzipDeflaterDataFormat;
    hl7?: HL7DataFormat;
    ical?: IcalDataFormat;
    jacksonXml?: JacksonXMLDataFormat;
    jaxb?: JaxbDataFormat;
    json?: JsonDataFormat;
    jsonApi?: JsonApiDataFormat;
    lzf?: LZFDataFormat;
    mimeMultipart?: MimeMultipartDataFormat;
    parquetAvro?: ParquetAvroDataFormat | string;
    pgp?: PGPDataFormat;
    protobuf?: ProtobufDataFormat | string;
    rss?: RssDataFormat;
    smooks?: SmooksDataFormat;
    soap?: SoapDataFormat | string;
    swiftMt?: SwiftMtDataFormat | string;
    swiftMx?: SwiftMxDataFormat;
    syslog?: SyslogDataFormat;
    tarFile?: TarFileDataFormat;
    thrift?: ThriftDataFormat | string;
    tidyMarkup?: TidyMarkupDataFormat;
    univocityCsv?: UniVocityCsvDataFormat;
    univocityFixed?: UniVocityFixedDataFormat;
    univocityTsv?: UniVocityTsvDataFormat;
    xmlSecurity?: XMLSecurityDataFormat;
    yaml?: YAMLDataFormat;
    zipDeflater?: ZipDeflaterDataFormat;
    zipFile?: ZipFileDataFormat;
    constructor(init?: Partial<MarshalDefinition>);
}
export declare class MulticastDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    aggregationStrategy?: string;
    aggregationStrategyMethodName?: string;
    aggregationStrategyMethodAllowNull?: boolean;
    parallelAggregate?: boolean;
    parallelProcessing?: boolean;
    synchronous?: boolean;
    streaming?: boolean;
    stopOnException?: boolean;
    timeout?: string;
    executorService?: string;
    onPrepare?: string;
    shareUnitOfWork?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<MulticastDefinition>);
}
export declare class OnCompletionDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    mode?: string;
    onCompleteOnly?: boolean;
    onFailureOnly?: boolean;
    parallelProcessing?: boolean;
    executorService?: string;
    useOriginalMessage?: boolean;
    onWhen?: OnWhenDefinition;
    steps?: CamelElement[];
    constructor(init?: Partial<OnCompletionDefinition>);
}
export declare class OnExceptionDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    exception?: string[];
    onWhen?: OnWhenDefinition;
    retryWhile?: ExpressionSubElementDefinition;
    redeliveryPolicy?: RedeliveryPolicyDefinition;
    redeliveryPolicyRef?: string;
    handled?: ExpressionSubElementDefinition;
    continued?: ExpressionSubElementDefinition;
    onRedeliveryRef?: string;
    onExceptionOccurredRef?: string;
    useOriginalMessage?: boolean;
    useOriginalBody?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<OnExceptionDefinition>);
}
export declare class OnFallbackDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    fallbackViaNetwork?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<OnFallbackDefinition>);
}
export declare class OnWhenDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    expression?: ExpressionDefinition;
    constructor(init?: Partial<OnWhenDefinition>);
}
export declare class OptimisticLockRetryPolicyDefinition extends CamelElement {
    stepName?: string;
    maximumRetries?: number;
    retryDelay?: string;
    maximumRetryDelay?: string;
    exponentialBackOff?: boolean;
    randomBackOff?: boolean;
    constructor(init?: Partial<OptimisticLockRetryPolicyDefinition>);
}
export declare class OtherwiseDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<OtherwiseDefinition>);
}
export declare class OutputDefinition extends CamelElement {
    stepName?: string;
    description?: string;
    disabled?: boolean;
    id?: string;
    steps?: CamelElement[];
    constructor(init?: Partial<OutputDefinition>);
}
export declare class OutputTypeDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    urn: string;
    validate?: boolean;
    constructor(init?: Partial<OutputTypeDefinition>);
}
export declare class PackageScanDefinition extends CamelElement {
    stepName?: string;
    package?: string[];
    excludes?: string[];
    includes?: string[];
    constructor(init?: Partial<PackageScanDefinition>);
}
export declare class PausableDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    consumerListener: string;
    untilCheck: string;
    constructor(init?: Partial<PausableDefinition>);
}
export declare class PipelineDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<PipelineDefinition>);
}
export declare class PolicyDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    ref: string;
    steps?: CamelElement[];
    constructor(init?: Partial<PolicyDefinition>);
}
export declare class PollDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    variableReceive?: string;
    uri: string;
    timeout?: string;
    parameters?: any;
    constructor(init?: Partial<PollDefinition>);
}
export declare class PollEnrichDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    expression?: ExpressionDefinition;
    variableReceive?: string;
    aggregationStrategy?: string;
    aggregationStrategyMethodName?: string;
    aggregationStrategyMethodAllowNull?: string;
    aggregateOnException?: boolean;
    timeout?: string;
    cacheSize?: number;
    ignoreInvalidEndpoint?: boolean;
    autoStartComponents?: boolean;
    constructor(init?: Partial<PollEnrichDefinition>);
}
export declare class ProcessDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    ref: string;
    constructor(init?: Partial<ProcessDefinition>);
}
export declare class PropertyDefinition extends CamelElement {
    stepName?: string;
    key: string;
    value: string;
    constructor(init?: Partial<PropertyDefinition>);
}
export declare class PropertyExpressionDefinition extends CamelElement {
    stepName?: string;
    key: string;
    expression?: ExpressionDefinition;
    constructor(init?: Partial<PropertyExpressionDefinition>);
}
export declare class RecipientListDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    expression?: ExpressionDefinition;
    delimiter?: string;
    aggregationStrategy?: string;
    aggregationStrategyMethodName?: string;
    aggregationStrategyMethodAllowNull?: boolean;
    parallelAggregate?: boolean;
    parallelProcessing?: boolean;
    synchronous?: boolean;
    timeout?: string;
    executorService?: string;
    stopOnException?: boolean;
    ignoreInvalidEndpoints?: boolean;
    streaming?: boolean;
    onPrepare?: string;
    cacheSize?: number;
    shareUnitOfWork?: boolean;
    constructor(init?: Partial<RecipientListDefinition>);
}
export declare class RedeliveryPolicyDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    maximumRedeliveries?: number;
    redeliveryDelay?: string;
    asyncDelayedRedelivery?: boolean;
    backOffMultiplier?: number;
    useExponentialBackOff?: boolean;
    collisionAvoidanceFactor?: number;
    useCollisionAvoidance?: boolean;
    maximumRedeliveryDelay?: string;
    retriesExhaustedLogLevel?: string;
    retryAttemptedLogLevel?: string;
    retryAttemptedLogInterval?: number;
    logRetryAttempted?: boolean;
    logStackTrace?: boolean;
    logRetryStackTrace?: boolean;
    logHandled?: boolean;
    logNewException?: boolean;
    logContinued?: boolean;
    logExhausted?: boolean;
    logExhaustedMessageHistory?: boolean;
    logExhaustedMessageBody?: boolean;
    disableRedelivery?: boolean;
    delayPattern?: string;
    allowRedeliveryWhileStopping?: boolean;
    exchangeFormatterRef?: string;
    constructor(init?: Partial<RedeliveryPolicyDefinition>);
}
export declare class RemoveHeaderDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    name: string;
    constructor(init?: Partial<RemoveHeaderDefinition>);
}
export declare class RemoveHeadersDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    pattern: string;
    excludePattern?: string;
    constructor(init?: Partial<RemoveHeadersDefinition>);
}
export declare class RemovePropertiesDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    pattern: string;
    excludePattern?: string;
    constructor(init?: Partial<RemovePropertiesDefinition>);
}
export declare class RemovePropertyDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    name: string;
    constructor(init?: Partial<RemovePropertyDefinition>);
}
export declare class RemoveVariableDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    name: string;
    constructor(init?: Partial<RemoveVariableDefinition>);
}
export declare class ResequenceDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    expression?: ExpressionDefinition;
    batchConfig?: BatchResequencerConfig;
    streamConfig?: StreamResequencerConfig;
    steps?: CamelElement[];
    constructor(init?: Partial<ResequenceDefinition>);
}
export declare class Resilience4jConfigurationDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    circuitBreaker?: string;
    config?: string;
    failureRateThreshold?: number;
    permittedNumberOfCallsInHalfOpenState?: number;
    throwExceptionWhenHalfOpenOrOpenState?: boolean;
    slidingWindowSize?: number;
    slidingWindowType?: string;
    minimumNumberOfCalls?: number;
    writableStackTraceEnabled?: boolean;
    waitDurationInOpenState?: number;
    automaticTransitionFromOpenToHalfOpenEnabled?: boolean;
    slowCallRateThreshold?: number;
    slowCallDurationThreshold?: number;
    bulkheadEnabled?: boolean;
    bulkheadMaxConcurrentCalls?: number;
    bulkheadMaxWaitDuration?: number;
    timeoutEnabled?: boolean;
    timeoutExecutorService?: string;
    timeoutDuration?: number;
    timeoutCancelRunningFuture?: boolean;
    recordException?: string[];
    ignoreException?: string[];
    constructor(init?: Partial<Resilience4jConfigurationDefinition>);
}
export declare class RestContextRefDefinition extends CamelElement {
    stepName?: string;
    ref: string;
    constructor(init?: Partial<RestContextRefDefinition>);
}
export declare class ResumableDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    resumeStrategy: string;
    loggingLevel?: string;
    intermittent?: boolean;
    constructor(init?: Partial<ResumableDefinition>);
}
export declare class RollbackDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    message?: string;
    markRollbackOnly?: boolean;
    markRollbackOnlyLast?: boolean;
    constructor(init?: Partial<RollbackDefinition>);
}
export declare class RouteBuilderDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    ref: string;
    constructor(init?: Partial<RouteBuilderDefinition>);
}
export declare class RouteConfigurationContextRefDefinition extends CamelElement {
    stepName?: string;
    ref: string;
    constructor(init?: Partial<RouteConfigurationContextRefDefinition>);
}
export declare class RouteConfigurationDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    errorHandler?: ErrorHandlerDefinition;
    intercept?: InterceptDefinition[];
    interceptFrom?: InterceptFromDefinition[];
    interceptSendToEndpoint?: InterceptSendToEndpointDefinition[];
    onException?: OnExceptionDefinition[];
    onCompletion?: OnCompletionDefinition[];
    precondition?: string;
    constructor(init?: Partial<RouteConfigurationDefinition>);
}
export declare class RouteContextRefDefinition extends CamelElement {
    stepName?: string;
    ref: string;
    constructor(init?: Partial<RouteContextRefDefinition>);
}
export declare class RouteDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    group?: string;
    nodePrefixId?: string;
    routeConfigurationId?: string;
    autoStartup?: boolean;
    startupOrder?: number;
    streamCache?: boolean;
    trace?: boolean;
    messageHistory?: boolean;
    logMask?: boolean;
    errorHandlerRef?: string;
    shutdownRoute?: string;
    shutdownRunningTask?: string;
    precondition?: string;
    errorHandler?: ErrorHandlerDefinition;
    inputType?: InputTypeDefinition;
    outputType?: OutputTypeDefinition;
    from: FromDefinition;
    constructor(init?: Partial<RouteDefinition>);
}
export declare class RouteTemplateDefinition extends CamelElement {
    stepName?: string;
    id: string;
    description?: string;
    route?: RouteDefinition;
    beans?: BeanFactoryDefinition[];
    from?: FromDefinition;
    parameters?: RouteTemplateParameterDefinition[];
    constructor(init?: Partial<RouteTemplateDefinition>);
}
export declare class RouteTemplateParameterDefinition extends CamelElement {
    stepName?: string;
    description?: string;
    name: string;
    required?: boolean;
    defaultValue?: string;
    constructor(init?: Partial<RouteTemplateParameterDefinition>);
}
export declare class RoutingSlipDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    expression?: ExpressionDefinition;
    uriDelimiter?: string;
    ignoreInvalidEndpoints?: boolean;
    cacheSize?: number;
    constructor(init?: Partial<RoutingSlipDefinition>);
}
export declare class SagaActionUriDefinition extends CamelElement {
    stepName?: string;
    description?: string;
    disabled?: boolean;
    id?: string;
    parameters?: any;
    uri: string;
    constructor(init?: Partial<SagaActionUriDefinition>);
}
export declare class SagaDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    sagaService?: string;
    propagation?: string;
    completionMode?: string;
    timeout?: string;
    compensation?: string;
    completion?: string;
    option?: PropertyExpressionDefinition[];
    steps?: CamelElement[];
    constructor(init?: Partial<SagaDefinition>);
}
export declare class SamplingDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    samplePeriod?: string;
    messageFrequency?: number;
    constructor(init?: Partial<SamplingDefinition>);
}
export declare class ScriptDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    expression?: ExpressionDefinition;
    constructor(init?: Partial<ScriptDefinition>);
}
export declare class SetBodyDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    expression?: ExpressionDefinition;
    constructor(init?: Partial<SetBodyDefinition>);
}
export declare class SetExchangePatternDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    pattern?: string;
    constructor(init?: Partial<SetExchangePatternDefinition>);
}
export declare class SetHeaderDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    name: string;
    expression?: ExpressionDefinition;
    constructor(init?: Partial<SetHeaderDefinition>);
}
export declare class SetHeadersDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    headers?: SetHeaderDefinition[];
    constructor(init?: Partial<SetHeadersDefinition>);
}
export declare class SetPropertyDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    name: string;
    expression?: ExpressionDefinition;
    constructor(init?: Partial<SetPropertyDefinition>);
}
export declare class SetVariableDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    name: string;
    expression?: ExpressionDefinition;
    constructor(init?: Partial<SetVariableDefinition>);
}
export declare class SetVariablesDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    variables?: SetVariableDefinition[];
    constructor(init?: Partial<SetVariablesDefinition>);
}
export declare class SortDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    expression?: ExpressionDefinition;
    comparator?: string;
    constructor(init?: Partial<SortDefinition>);
}
export declare class SplitDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    expression?: ExpressionDefinition;
    delimiter?: string;
    aggregationStrategy?: string;
    aggregationStrategyMethodName?: string;
    aggregationStrategyMethodAllowNull?: boolean;
    parallelAggregate?: boolean;
    parallelProcessing?: boolean;
    synchronous?: boolean;
    streaming?: boolean;
    stopOnException?: boolean;
    timeout?: string;
    executorService?: string;
    onPrepare?: string;
    shareUnitOfWork?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<SplitDefinition>);
}
export declare class StepDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    steps?: CamelElement[];
    constructor(init?: Partial<StepDefinition>);
}
export declare class StopDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    constructor(init?: Partial<StopDefinition>);
}
export declare class TemplatedRouteDefinition extends CamelElement {
    stepName?: string;
    routeTemplateRef: string;
    routeId?: string;
    prefixId?: string;
    beans?: BeanFactoryDefinition[];
    parameters?: TemplatedRouteParameterDefinition[];
    constructor(init?: Partial<TemplatedRouteDefinition>);
}
export declare class TemplatedRouteParameterDefinition extends CamelElement {
    stepName?: string;
    name: string;
    value: string;
    constructor(init?: Partial<TemplatedRouteParameterDefinition>);
}
export declare class ThreadPoolProfileDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    defaultProfile?: boolean;
    poolSize?: number;
    maxPoolSize?: number;
    keepAliveTime?: number;
    timeUnit?: string;
    maxQueueSize?: number;
    allowCoreThreadTimeOut?: boolean;
    rejectedPolicy?: string;
    constructor(init?: Partial<ThreadPoolProfileDefinition>);
}
export declare class ThreadsDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    executorService?: string;
    poolSize?: number;
    maxPoolSize?: number;
    keepAliveTime?: number;
    timeUnit?: string;
    maxQueueSize?: number;
    allowCoreThreadTimeOut?: boolean;
    threadName?: string;
    rejectedPolicy?: string;
    callerRunsWhenRejected?: string;
    constructor(init?: Partial<ThreadsDefinition>);
}
export declare class ThrottleDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    expression?: ExpressionDefinition;
    mode?: string;
    correlationExpression?: ExpressionSubElementDefinition;
    executorService?: string;
    asyncDelayed?: boolean;
    callerRunsWhenRejected?: boolean;
    rejectExecution?: boolean;
    timePeriodMillis?: string;
    constructor(init?: Partial<ThrottleDefinition>);
}
export declare class ThrowExceptionDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    message?: string;
    exceptionType?: string;
    ref?: string;
    constructor(init?: Partial<ThrowExceptionDefinition>);
}
export declare class ToDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    variableSend?: string;
    variableReceive?: string;
    uri: string;
    pattern?: string;
    parameters?: any;
    constructor(init?: Partial<ToDefinition>);
}
export declare class ToDynamicDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    uri: string;
    variableSend?: string;
    variableReceive?: string;
    pattern?: string;
    cacheSize?: number;
    ignoreInvalidEndpoint?: boolean;
    allowOptimisedComponents?: boolean;
    autoStartComponents?: boolean;
    parameters?: any;
    constructor(init?: Partial<ToDynamicDefinition>);
}
export declare class TokenizerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    langChain4jCharacterTokenizer?: LangChain4jCharacterTokenizerDefinition;
    langChain4jLineTokenizer?: LangChain4jTokenizerDefinition;
    langChain4jParagraphTokenizer?: LangChain4jParagraphTokenizerDefinition;
    langChain4jSentenceTokenizer?: LangChain4jSentenceTokenizerDefinition;
    langChain4jWordTokenizer?: LangChain4jWordTokenizerDefinition;
    constructor(init?: Partial<TokenizerDefinition>);
}
export declare class TokenizerImplementationDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    constructor(init?: Partial<TokenizerImplementationDefinition>);
}
export declare class TransactedDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    ref?: string;
    steps?: CamelElement[];
    constructor(init?: Partial<TransactedDefinition>);
}
export declare class TransformDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    expression?: ExpressionDefinition;
    fromType?: string;
    toType?: string;
    constructor(init?: Partial<TransformDefinition>);
}
export declare class TryDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    doCatch?: CatchDefinition[];
    doFinally?: FinallyDefinition;
    steps?: CamelElement[];
    constructor(init?: Partial<TryDefinition>);
}
export declare class UnmarshalDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    variableSend?: string;
    variableReceive?: string;
    allowNullBody?: boolean;
    asn1?: ASN1DataFormat | string;
    avro?: AvroDataFormat | string;
    barcode?: BarcodeDataFormat;
    base64?: Base64DataFormat;
    beanio?: BeanioDataFormat;
    bindy?: BindyDataFormat;
    cbor?: CBORDataFormat;
    crypto?: CryptoDataFormat;
    csv?: CsvDataFormat | string;
    custom?: CustomDataFormat | string;
    fhirJson?: FhirJsonDataFormat;
    fhirXml?: FhirXmlDataFormat;
    flatpack?: FlatpackDataFormat;
    fury?: FuryDataFormat;
    grok?: GrokDataFormat;
    gzipDeflater?: GzipDeflaterDataFormat;
    hl7?: HL7DataFormat;
    ical?: IcalDataFormat;
    jacksonXml?: JacksonXMLDataFormat;
    jaxb?: JaxbDataFormat;
    json?: JsonDataFormat;
    jsonApi?: JsonApiDataFormat;
    lzf?: LZFDataFormat;
    mimeMultipart?: MimeMultipartDataFormat;
    parquetAvro?: ParquetAvroDataFormat | string;
    pgp?: PGPDataFormat;
    protobuf?: ProtobufDataFormat | string;
    rss?: RssDataFormat;
    smooks?: SmooksDataFormat;
    soap?: SoapDataFormat | string;
    swiftMt?: SwiftMtDataFormat | string;
    swiftMx?: SwiftMxDataFormat;
    syslog?: SyslogDataFormat;
    tarFile?: TarFileDataFormat;
    thrift?: ThriftDataFormat | string;
    tidyMarkup?: TidyMarkupDataFormat;
    univocityCsv?: UniVocityCsvDataFormat;
    univocityFixed?: UniVocityFixedDataFormat;
    univocityTsv?: UniVocityTsvDataFormat;
    xmlSecurity?: XMLSecurityDataFormat;
    yaml?: YAMLDataFormat;
    zipDeflater?: ZipDeflaterDataFormat;
    zipFile?: ZipFileDataFormat;
    constructor(init?: Partial<UnmarshalDefinition>);
}
export declare class ValidateDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    expression?: ExpressionDefinition;
    predicateExceptionFactory?: string;
    constructor(init?: Partial<ValidateDefinition>);
}
export declare class ValueDefinition extends CamelElement {
    stepName?: string;
    value?: string;
    constructor(init?: Partial<ValueDefinition>);
}
export declare class WhenDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    expression?: ExpressionDefinition;
    steps?: CamelElement[];
    constructor(init?: Partial<WhenDefinition>);
}
export declare class WireTapDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    copy?: boolean;
    dynamicUri?: boolean;
    onPrepare?: string;
    executorService?: string;
    uri: string;
    variableSend?: string;
    variableReceive?: string;
    pattern?: string;
    cacheSize?: number;
    ignoreInvalidEndpoint?: boolean;
    allowOptimisedComponents?: boolean;
    autoStartComponents?: boolean;
    parameters?: any;
    constructor(init?: Partial<WireTapDefinition>);
}
export declare class BeanConstructorDefinition extends CamelElement {
    stepName?: string;
    index?: number;
    value: string;
    constructor(init?: Partial<BeanConstructorDefinition>);
}
export declare class BeanConstructorsDefinition extends CamelElement {
    stepName?: string;
    _constructor?: BeanConstructorDefinition[];
    constructor(init?: Partial<BeanConstructorsDefinition>);
}
export declare class BeanPropertiesDefinition extends CamelElement {
    stepName?: string;
    property?: BeanPropertyDefinition[];
    constructor(init?: Partial<BeanPropertiesDefinition>);
}
export declare class BeanPropertyDefinition extends CamelElement {
    stepName?: string;
    key?: string;
    properties?: BeanPropertiesDefinition;
    value?: string;
    constructor(init?: Partial<BeanPropertyDefinition>);
}
export declare class ComponentScanDefinition extends CamelElement {
    stepName?: string;
    basePackage?: string;
    constructor(init?: Partial<ComponentScanDefinition>);
}
export declare class BatchResequencerConfig extends CamelElement {
    batchSize?: number;
    batchTimeout?: string;
    allowDuplicates?: boolean;
    reverse?: boolean;
    ignoreInvalidExchanges?: boolean;
    constructor(init?: Partial<BatchResequencerConfig>);
}
export declare class StreamResequencerConfig extends CamelElement {
    capacity?: number;
    timeout?: string;
    deliveryAttemptInterval?: string;
    ignoreInvalidExchanges?: boolean;
    rejectOld?: boolean;
    comparator?: string;
    constructor(init?: Partial<StreamResequencerConfig>);
}
export declare class ASN1DataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    unmarshalType?: string;
    usingIterator?: boolean;
    constructor(init?: Partial<ASN1DataFormat>);
}
export declare class AvroDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    instanceClassName?: string;
    library?: string;
    objectMapper?: string;
    useDefaultObjectMapper?: boolean;
    unmarshalType?: string;
    jsonView?: string;
    include?: string;
    allowJmsType?: boolean;
    collectionType?: string;
    useList?: boolean;
    moduleClassNames?: string;
    moduleRefs?: string;
    enableFeatures?: string;
    disableFeatures?: string;
    allowUnmarshallType?: boolean;
    timezone?: string;
    autoDiscoverObjectMapper?: boolean;
    contentTypeHeader?: boolean;
    schemaResolver?: string;
    autoDiscoverSchemaResolver?: boolean;
    constructor(init?: Partial<AvroDataFormat>);
}
export declare class BarcodeDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    barcodeFormat?: string;
    imageType?: string;
    width?: number;
    height?: number;
    constructor(init?: Partial<BarcodeDataFormat>);
}
export declare class Base64DataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    lineLength?: number;
    lineSeparator?: string;
    urlSafe?: boolean;
    constructor(init?: Partial<Base64DataFormat>);
}
export declare class BeanioDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    mapping: string;
    streamName: string;
    ignoreUnidentifiedRecords?: boolean;
    ignoreUnexpectedRecords?: boolean;
    ignoreInvalidRecords?: boolean;
    encoding?: string;
    beanReaderErrorHandlerType?: string;
    unmarshalSingleObject?: boolean;
    constructor(init?: Partial<BeanioDataFormat>);
}
export declare class BindyDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    type?: string;
    classType?: string;
    allowEmptyStream?: boolean;
    unwrapSingleInstance?: boolean;
    locale?: string;
    constructor(init?: Partial<BindyDataFormat>);
}
export declare class CBORDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    objectMapper?: string;
    useDefaultObjectMapper?: boolean;
    unmarshalType?: string;
    collectionType?: string;
    useList?: boolean;
    allowUnmarshallType?: boolean;
    prettyPrint?: boolean;
    allowJmsType?: boolean;
    enableFeatures?: string;
    disableFeatures?: string;
    constructor(init?: Partial<CBORDataFormat>);
}
export declare class CryptoDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    algorithm?: string;
    keyRef?: string;
    cryptoProvider?: string;
    initVectorRef?: string;
    algorithmParameterRef?: string;
    bufferSize?: number;
    macAlgorithm?: string;
    shouldAppendHMAC?: boolean;
    inline?: boolean;
    constructor(init?: Partial<CryptoDataFormat>);
}
export declare class CsvDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    formatRef?: string;
    formatName?: string;
    commentMarkerDisabled?: boolean;
    commentMarker?: string;
    delimiter?: string;
    escapeDisabled?: boolean;
    escape?: string;
    headerDisabled?: boolean;
    header?: string[];
    allowMissingColumnNames?: boolean;
    ignoreEmptyLines?: boolean;
    ignoreSurroundingSpaces?: boolean;
    nullStringDisabled?: boolean;
    nullString?: string;
    quoteDisabled?: boolean;
    quote?: string;
    recordSeparatorDisabled?: string;
    recordSeparator?: string;
    skipHeaderRecord?: boolean;
    quoteMode?: string;
    ignoreHeaderCase?: boolean;
    trim?: boolean;
    trailingDelimiter?: boolean;
    marshallerFactoryRef?: string;
    lazyLoad?: boolean;
    useMaps?: boolean;
    useOrderedMaps?: boolean;
    recordConverterRef?: string;
    captureHeaderRecord?: boolean;
    constructor(init?: Partial<CsvDataFormat>);
}
export declare class CustomDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    ref: string;
    constructor(init?: Partial<CustomDataFormat>);
}
export declare class DataFormatsDefinition extends CamelElement {
    stepName?: string;
    asn1?: ASN1DataFormat | string;
    avro?: AvroDataFormat | string;
    barcode?: BarcodeDataFormat;
    base64?: Base64DataFormat;
    beanio?: BeanioDataFormat;
    bindy?: BindyDataFormat;
    cbor?: CBORDataFormat;
    crypto?: CryptoDataFormat;
    csv?: CsvDataFormat | string;
    custom?: CustomDataFormat | string;
    fhirJson?: FhirJsonDataFormat;
    fhirXml?: FhirXmlDataFormat;
    flatpack?: FlatpackDataFormat;
    fury?: FuryDataFormat;
    grok?: GrokDataFormat;
    gzipDeflater?: GzipDeflaterDataFormat;
    hl7?: HL7DataFormat;
    ical?: IcalDataFormat;
    jacksonXml?: JacksonXMLDataFormat;
    jaxb?: JaxbDataFormat;
    json?: JsonDataFormat;
    jsonApi?: JsonApiDataFormat;
    lzf?: LZFDataFormat;
    mimeMultipart?: MimeMultipartDataFormat;
    parquetAvro?: ParquetAvroDataFormat | string;
    pgp?: PGPDataFormat;
    protobuf?: ProtobufDataFormat | string;
    rss?: RssDataFormat;
    smooks?: SmooksDataFormat;
    soap?: SoapDataFormat | string;
    swiftMt?: SwiftMtDataFormat | string;
    swiftMx?: SwiftMxDataFormat;
    syslog?: SyslogDataFormat;
    tarFile?: TarFileDataFormat;
    thrift?: ThriftDataFormat | string;
    tidyMarkup?: TidyMarkupDataFormat;
    univocityCsv?: UniVocityCsvDataFormat;
    univocityFixed?: UniVocityFixedDataFormat;
    univocityTsv?: UniVocityTsvDataFormat;
    xmlSecurity?: XMLSecurityDataFormat;
    yaml?: YAMLDataFormat;
    zipDeflater?: ZipDeflaterDataFormat;
    zipFile?: ZipFileDataFormat;
    constructor(init?: Partial<DataFormatsDefinition>);
}
export declare class FhirJsonDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    fhirVersion?: string;
    fhirContext?: string;
    prettyPrint?: boolean;
    parserErrorHandler?: string;
    parserOptions?: string;
    preferTypes?: string;
    forceResourceId?: string;
    serverBaseUrl?: string;
    omitResourceId?: boolean;
    encodeElementsAppliesToChildResourcesOnly?: boolean;
    encodeElements?: string;
    dontEncodeElements?: string;
    stripVersionsFromReferences?: boolean;
    overrideResourceIdWithBundleEntryFullUrl?: boolean;
    summaryMode?: boolean;
    suppressNarratives?: boolean;
    dontStripVersionsFromReferencesAtPaths?: string;
    contentTypeHeader?: boolean;
    constructor(init?: Partial<FhirJsonDataFormat>);
}
export declare class FhirXmlDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    fhirVersion?: string;
    fhirContext?: string;
    prettyPrint?: boolean;
    parserErrorHandler?: string;
    parserOptions?: string;
    preferTypes?: string;
    forceResourceId?: string;
    serverBaseUrl?: string;
    omitResourceId?: boolean;
    encodeElementsAppliesToChildResourcesOnly?: boolean;
    encodeElements?: string;
    dontEncodeElements?: string;
    stripVersionsFromReferences?: boolean;
    overrideResourceIdWithBundleEntryFullUrl?: boolean;
    summaryMode?: boolean;
    suppressNarratives?: boolean;
    dontStripVersionsFromReferencesAtPaths?: string;
    contentTypeHeader?: boolean;
    constructor(init?: Partial<FhirXmlDataFormat>);
}
export declare class FlatpackDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    definition?: string;
    fixed?: boolean;
    delimiter?: string;
    ignoreFirstRecord?: boolean;
    allowShortLines?: boolean;
    ignoreExtraColumns?: boolean;
    textQualifier?: string;
    parserFactoryRef?: string;
    constructor(init?: Partial<FlatpackDataFormat>);
}
export declare class FuryDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    unmarshalType?: string;
    requireClassRegistration?: boolean;
    threadSafe?: boolean;
    allowAutoWiredFury?: boolean;
    constructor(init?: Partial<FuryDataFormat>);
}
export declare class GrokDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    pattern: string;
    flattened?: boolean;
    allowMultipleMatchesPerLine?: boolean;
    namedOnly?: boolean;
    constructor(init?: Partial<GrokDataFormat>);
}
export declare class GzipDeflaterDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    constructor(init?: Partial<GzipDeflaterDataFormat>);
}
export declare class HL7DataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    validate?: boolean;
    constructor(init?: Partial<HL7DataFormat>);
}
export declare class IcalDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    validating?: boolean;
    constructor(init?: Partial<IcalDataFormat>);
}
export declare class JacksonXMLDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    xmlMapper?: string;
    prettyPrint?: boolean;
    unmarshalType?: string;
    allowUnmarshallType?: boolean;
    jsonView?: string;
    include?: string;
    allowJmsType?: boolean;
    collectionType?: string;
    useList?: boolean;
    timezone?: string;
    enableJaxbAnnotationModule?: boolean;
    moduleClassNames?: string;
    moduleRefs?: string;
    enableFeatures?: string;
    disableFeatures?: string;
    contentTypeHeader?: boolean;
    constructor(init?: Partial<JacksonXMLDataFormat>);
}
export declare class JaxbDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    contextPath: string;
    contextPathIsClassName?: boolean;
    schema?: string;
    schemaSeverityLevel?: string;
    prettyPrint?: boolean;
    objectFactory?: boolean;
    ignoreJAXBElement?: boolean;
    mustBeJAXBElement?: boolean;
    filterNonXmlChars?: boolean;
    encoding?: string;
    fragment?: boolean;
    partClass?: string;
    partNamespace?: string;
    namespacePrefixRef?: string;
    xmlStreamWriterWrapper?: string;
    schemaLocation?: string;
    noNamespaceSchemaLocation?: string;
    jaxbProviderProperties?: string;
    contentTypeHeader?: boolean;
    accessExternalSchemaProtocols?: string;
    constructor(init?: Partial<JaxbDataFormat>);
}
export declare class JsonApiDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    dataFormatTypes?: string;
    mainFormatType?: string;
    constructor(init?: Partial<JsonApiDataFormat>);
}
export declare class JsonDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    objectMapper?: string;
    useDefaultObjectMapper?: boolean;
    autoDiscoverObjectMapper?: boolean;
    prettyPrint?: boolean;
    library?: string;
    combineUnicodeSurrogates?: boolean;
    unmarshalType?: string;
    jsonView?: string;
    include?: string;
    allowJmsType?: boolean;
    collectionType?: string;
    useList?: boolean;
    moduleClassNames?: string;
    moduleRefs?: string;
    enableFeatures?: string;
    disableFeatures?: string;
    allowUnmarshallType?: boolean;
    timezone?: string;
    schemaResolver?: string;
    autoDiscoverSchemaResolver?: boolean;
    namingStrategy?: string;
    contentTypeHeader?: boolean;
    dateFormatPattern?: string;
    constructor(init?: Partial<JsonDataFormat>);
}
export declare class LZFDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    usingParallelCompression?: boolean;
    constructor(init?: Partial<LZFDataFormat>);
}
export declare class MimeMultipartDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    multipartSubType?: string;
    multipartWithoutAttachment?: boolean;
    headersInline?: boolean;
    includeHeaders?: string;
    binaryContent?: boolean;
    constructor(init?: Partial<MimeMultipartDataFormat>);
}
export declare class PGPDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    keyUserid?: string;
    signatureKeyUserid?: string;
    password?: string;
    signaturePassword?: string;
    keyFileName?: string;
    signatureKeyFileName?: string;
    signatureKeyRing?: string;
    armored?: boolean;
    integrity?: boolean;
    provider?: string;
    algorithm?: number;
    compressionAlgorithm?: number;
    hashAlgorithm?: number;
    signatureVerificationOption?: string;
    constructor(init?: Partial<PGPDataFormat>);
}
export declare class ParquetAvroDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    compressionCodecName?: string;
    unmarshalType?: string;
    lazyLoad?: boolean;
    constructor(init?: Partial<ParquetAvroDataFormat>);
}
export declare class ProtobufDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    instanceClass?: string;
    objectMapper?: string;
    useDefaultObjectMapper?: boolean;
    autoDiscoverObjectMapper?: boolean;
    library?: string;
    unmarshalType?: string;
    jsonView?: string;
    include?: string;
    allowJmsType?: boolean;
    collectionType?: string;
    useList?: boolean;
    moduleClassNames?: string;
    moduleRefs?: string;
    enableFeatures?: string;
    disableFeatures?: string;
    allowUnmarshallType?: boolean;
    timezone?: string;
    schemaResolver?: string;
    autoDiscoverSchemaResolver?: boolean;
    contentTypeFormat?: string;
    contentTypeHeader?: boolean;
    constructor(init?: Partial<ProtobufDataFormat>);
}
export declare class RssDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    constructor(init?: Partial<RssDataFormat>);
}
export declare class SmooksDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    smooksConfig: string;
    constructor(init?: Partial<SmooksDataFormat>);
}
export declare class SoapDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    contextPath: string;
    encoding?: string;
    elementNameStrategyRef?: string;
    version?: string;
    namespacePrefixRef?: string;
    schema?: string;
    constructor(init?: Partial<SoapDataFormat>);
}
export declare class SwiftMtDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    writeInJson?: boolean;
    constructor(init?: Partial<SwiftMtDataFormat>);
}
export declare class SwiftMxDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    writeConfigRef?: string;
    writeInJson?: boolean;
    readMessageId?: string;
    readConfigRef?: string;
    constructor(init?: Partial<SwiftMxDataFormat>);
}
export declare class SyslogDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    constructor(init?: Partial<SyslogDataFormat>);
}
export declare class TarFileDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    usingIterator?: boolean;
    allowEmptyDirectory?: boolean;
    preservePathElements?: boolean;
    maxDecompressedSize?: number;
    constructor(init?: Partial<TarFileDataFormat>);
}
export declare class ThriftDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    instanceClass?: string;
    contentTypeFormat?: string;
    contentTypeHeader?: boolean;
    constructor(init?: Partial<ThriftDataFormat>);
}
export declare class TidyMarkupDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    dataObjectType?: string;
    omitXmlDeclaration?: boolean;
    constructor(init?: Partial<TidyMarkupDataFormat>);
}
export declare class UniVocityCsvDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    delimiter?: string;
    quoteAllFields?: boolean;
    quote?: string;
    quoteEscape?: string;
    nullValue?: string;
    skipEmptyLines?: boolean;
    ignoreTrailingWhitespaces?: boolean;
    ignoreLeadingWhitespaces?: boolean;
    headersDisabled?: boolean;
    headerExtractionEnabled?: boolean;
    numberOfRecordsToRead?: number;
    emptyValue?: string;
    lineSeparator?: string;
    normalizedLineSeparator?: string;
    comment?: string;
    lazyLoad?: boolean;
    asMap?: boolean;
    univocityHeader?: UniVocityHeader[];
    constructor(init?: Partial<UniVocityCsvDataFormat>);
}
export declare class UniVocityFixedDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    padding?: string;
    skipTrailingCharsUntilNewline?: boolean;
    recordEndsOnNewline?: boolean;
    nullValue?: string;
    skipEmptyLines?: boolean;
    ignoreTrailingWhitespaces?: boolean;
    ignoreLeadingWhitespaces?: boolean;
    headersDisabled?: boolean;
    headerExtractionEnabled?: boolean;
    numberOfRecordsToRead?: number;
    emptyValue?: string;
    lineSeparator?: string;
    normalizedLineSeparator?: string;
    comment?: string;
    lazyLoad?: boolean;
    asMap?: boolean;
    univocityHeader?: UniVocityHeader[];
    constructor(init?: Partial<UniVocityFixedDataFormat>);
}
export declare class UniVocityHeader extends CamelElement {
    length?: string;
    name?: string;
    constructor(init?: Partial<UniVocityHeader>);
}
export declare class UniVocityTsvDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    escapeChar?: string;
    nullValue?: string;
    skipEmptyLines?: boolean;
    ignoreTrailingWhitespaces?: boolean;
    ignoreLeadingWhitespaces?: boolean;
    headersDisabled?: boolean;
    headerExtractionEnabled?: boolean;
    numberOfRecordsToRead?: number;
    emptyValue?: string;
    lineSeparator?: string;
    normalizedLineSeparator?: string;
    comment?: string;
    lazyLoad?: boolean;
    asMap?: boolean;
    univocityHeader?: UniVocityHeader[];
    constructor(init?: Partial<UniVocityTsvDataFormat>);
}
export declare class XMLSecurityDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    xmlCipherAlgorithm?: string;
    passPhrase?: string;
    passPhraseByte?: string;
    secureTag?: string;
    secureTagContents?: boolean;
    keyCipherAlgorithm?: string;
    recipientKeyAlias?: string;
    keyOrTrustStoreParametersRef?: string;
    keyPassword?: string;
    digestAlgorithm?: string;
    mgfAlgorithm?: string;
    addKeyValueForEncryptedKey?: boolean;
    constructor(init?: Partial<XMLSecurityDataFormat>);
}
export declare class YAMLDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    library?: string;
    unmarshalType?: string;
    _constructor?: string;
    representer?: string;
    dumperOptions?: string;
    resolver?: string;
    useApplicationContextClassLoader?: boolean;
    prettyFlow?: boolean;
    allowAnyType?: boolean;
    typeFilter?: YAMLTypeFilterDefinition[];
    maxAliasesForCollections?: number;
    allowRecursiveKeys?: boolean;
    constructor(init?: Partial<YAMLDataFormat>);
}
export declare class YAMLTypeFilterDefinition extends CamelElement {
    stepName?: string;
    type?: string;
    value?: string;
    constructor(init?: Partial<YAMLTypeFilterDefinition>);
}
export declare class ZipDeflaterDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    compressionLevel?: string;
    constructor(init?: Partial<ZipDeflaterDataFormat>);
}
export declare class ZipFileDataFormat extends CamelElement {
    dataFormatName?: string;
    id?: string;
    usingIterator?: boolean;
    allowEmptyDirectory?: boolean;
    preservePathElements?: boolean;
    maxDecompressedSize?: number;
    constructor(init?: Partial<ZipFileDataFormat>);
}
export declare class DeadLetterChannelDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    deadLetterUri: string;
    deadLetterHandleNewException?: boolean;
    redeliveryPolicy?: RedeliveryPolicyDefinition;
    useOriginalMessage?: boolean;
    useOriginalBody?: boolean;
    redeliveryPolicyRef?: string;
    loggerRef?: string;
    level?: string;
    logName?: string;
    onRedeliveryRef?: string;
    onExceptionOccurredRef?: string;
    onPrepareFailureRef?: string;
    retryWhileRef?: string;
    executorServiceRef?: string;
    constructor(init?: Partial<DeadLetterChannelDefinition>);
}
export declare class DefaultErrorHandlerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    redeliveryPolicy?: RedeliveryPolicyDefinition;
    useOriginalMessage?: boolean;
    useOriginalBody?: boolean;
    redeliveryPolicyRef?: string;
    loggerRef?: string;
    level?: string;
    logName?: string;
    onRedeliveryRef?: string;
    onExceptionOccurredRef?: string;
    onPrepareFailureRef?: string;
    retryWhileRef?: string;
    executorServiceRef?: string;
    constructor(init?: Partial<DefaultErrorHandlerDefinition>);
}
export declare class JtaTransactionErrorHandlerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    transactedPolicyRef?: string;
    rollbackLoggingLevel?: string;
    redeliveryPolicy?: RedeliveryPolicyDefinition;
    useOriginalMessage?: boolean;
    useOriginalBody?: boolean;
    redeliveryPolicyRef?: string;
    loggerRef?: string;
    level?: string;
    logName?: string;
    onRedeliveryRef?: string;
    onExceptionOccurredRef?: string;
    onPrepareFailureRef?: string;
    retryWhileRef?: string;
    executorServiceRef?: string;
    constructor(init?: Partial<JtaTransactionErrorHandlerDefinition>);
}
export declare class NoErrorHandlerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    constructor(init?: Partial<NoErrorHandlerDefinition>);
}
export declare class RefErrorHandlerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    ref: string;
    constructor(init?: Partial<RefErrorHandlerDefinition>);
}
export declare class SpringTransactionErrorHandlerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    transactedPolicyRef?: string;
    rollbackLoggingLevel?: string;
    redeliveryPolicy?: RedeliveryPolicyDefinition;
    useOriginalMessage?: boolean;
    useOriginalBody?: boolean;
    redeliveryPolicyRef?: string;
    loggerRef?: string;
    level?: string;
    logName?: string;
    onRedeliveryRef?: string;
    onExceptionOccurredRef?: string;
    onPrepareFailureRef?: string;
    retryWhileRef?: string;
    executorServiceRef?: string;
    constructor(init?: Partial<SpringTransactionErrorHandlerDefinition>);
}
export declare class CSimpleExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<CSimpleExpression>);
}
export declare class ConstantExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<ConstantExpression>);
}
export declare class DatasonnetExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    bodyMediaType?: string;
    outputMediaType?: string;
    source?: string;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<DatasonnetExpression>);
}
export declare class ExchangePropertyExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    trim?: boolean;
    constructor(init?: Partial<ExchangePropertyExpression>);
}
export declare class ExpressionDefinition extends CamelElement {
    stepName?: string;
    constant?: ConstantExpression | string;
    csimple?: CSimpleExpression | string;
    datasonnet?: DatasonnetExpression | string;
    exchangeProperty?: ExchangePropertyExpression | string;
    groovy?: GroovyExpression | string;
    header?: HeaderExpression | string;
    hl7terser?: Hl7TerserExpression | string;
    java?: JavaExpression | string;
    jq?: JqExpression | string;
    js?: JavaScriptExpression | string;
    jsonpath?: JsonPathExpression | string;
    language?: LanguageExpression;
    method?: MethodCallExpression | string;
    mvel?: MvelExpression | string;
    ognl?: OgnlExpression | string;
    python?: PythonExpression | string;
    ref?: RefExpression | string;
    simple?: SimpleExpression | string;
    spel?: SpELExpression | string;
    tokenize?: TokenizerExpression | string;
    variable?: VariableExpression | string;
    wasm?: WasmExpression | string;
    xpath?: XPathExpression | string;
    xquery?: XQueryExpression | string;
    xtokenize?: XMLTokenizerExpression | string;
    constructor(init?: Partial<ExpressionDefinition>);
}
export declare class GroovyExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<GroovyExpression>);
}
export declare class HeaderExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    trim?: boolean;
    constructor(init?: Partial<HeaderExpression>);
}
export declare class Hl7TerserExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    source?: string;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<Hl7TerserExpression>);
}
export declare class JavaExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    preCompile?: boolean;
    singleQuotes?: boolean;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<JavaExpression>);
}
export declare class JavaScriptExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<JavaScriptExpression>);
}
export declare class JqExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    source?: string;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<JqExpression>);
}
export declare class JsonPathExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    suppressExceptions?: boolean;
    allowSimple?: boolean;
    allowEasyPredicate?: boolean;
    writeAsString?: boolean;
    unpackArray?: boolean;
    option?: string;
    source?: string;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<JsonPathExpression>);
}
export declare class LanguageExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    language: string;
    expression: string;
    trim?: boolean;
    constructor(init?: Partial<LanguageExpression>);
}
export declare class MethodCallExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    ref?: string;
    method?: string;
    beanType?: string;
    scope?: string;
    validate?: boolean;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<MethodCallExpression>);
}
export declare class MvelExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<MvelExpression>);
}
export declare class OgnlExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<OgnlExpression>);
}
export declare class PythonExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<PythonExpression>);
}
export declare class RefExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<RefExpression>);
}
export declare class SimpleExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<SimpleExpression>);
}
export declare class SpELExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<SpELExpression>);
}
export declare class TokenizerExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    token: string;
    endToken?: string;
    inheritNamespaceTagName?: string;
    regex?: boolean;
    xml?: boolean;
    includeTokens?: boolean;
    group?: string;
    groupDelimiter?: string;
    skipFirst?: boolean;
    source?: string;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<TokenizerExpression>);
}
export declare class VariableExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    trim?: boolean;
    constructor(init?: Partial<VariableExpression>);
}
export declare class WasmExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    module: string;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<WasmExpression>);
}
export declare class XMLTokenizerExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    mode?: string;
    group?: number;
    namespace?: PropertyDefinition[];
    source?: string;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<XMLTokenizerExpression>);
}
export declare class XPathExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    documentType?: string;
    resultQName?: string;
    saxon?: boolean;
    factoryRef?: string;
    objectModel?: string;
    logNamespaces?: boolean;
    threadSafety?: boolean;
    preCompile?: boolean;
    namespace?: PropertyDefinition[];
    source?: string;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<XPathExpression>);
}
export declare class XQueryExpression extends CamelElement {
    expressionName?: string;
    id?: string;
    expression: string;
    configurationRef?: string;
    namespace?: PropertyDefinition[];
    source?: string;
    resultType?: string;
    trim?: boolean;
    constructor(init?: Partial<XQueryExpression>);
}
export declare class CustomLoadBalancerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    ref: string;
    constructor(init?: Partial<CustomLoadBalancerDefinition>);
}
export declare class FailoverLoadBalancerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    exception?: string[];
    roundRobin?: string;
    sticky?: string;
    maximumFailoverAttempts?: string;
    constructor(init?: Partial<FailoverLoadBalancerDefinition>);
}
export declare class RandomLoadBalancerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    constructor(init?: Partial<RandomLoadBalancerDefinition>);
}
export declare class RoundRobinLoadBalancerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    constructor(init?: Partial<RoundRobinLoadBalancerDefinition>);
}
export declare class StickyLoadBalancerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    correlationExpression?: ExpressionSubElementDefinition;
    constructor(init?: Partial<StickyLoadBalancerDefinition>);
}
export declare class TopicLoadBalancerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    constructor(init?: Partial<TopicLoadBalancerDefinition>);
}
export declare class WeightedLoadBalancerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    distributionRatio: string;
    distributionRatioDelimiter?: string;
    roundRobin?: boolean;
    constructor(init?: Partial<WeightedLoadBalancerDefinition>);
}
export declare class ApiKeyDefinition extends CamelElement {
    stepName?: string;
    description?: string;
    name: string;
    key: string;
    inHeader?: boolean;
    inQuery?: boolean;
    inCookie?: boolean;
    constructor(init?: Partial<ApiKeyDefinition>);
}
export declare class BasicAuthDefinition extends CamelElement {
    stepName?: string;
    description?: string;
    key: string;
    constructor(init?: Partial<BasicAuthDefinition>);
}
export declare class BearerTokenDefinition extends CamelElement {
    stepName?: string;
    description?: string;
    key: string;
    format?: string;
    constructor(init?: Partial<BearerTokenDefinition>);
}
export declare class DeleteDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    path?: string;
    to?: string;
    param?: ParamDefinition[];
    responseMessage?: ResponseMessageDefinition[];
    security?: SecurityDefinition[];
    consumes?: string;
    produces?: string;
    type?: string;
    outType?: string;
    bindingMode?: string;
    skipBindingOnErrorCode?: boolean;
    clientRequestValidation?: boolean;
    enableCORS?: boolean;
    enableNoContentResponse?: boolean;
    apiDocs?: boolean;
    deprecated?: boolean;
    streamCache?: boolean;
    routeId?: string;
    constructor(init?: Partial<DeleteDefinition>);
}
export declare class GetDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    path?: string;
    to?: string;
    param?: ParamDefinition[];
    responseMessage?: ResponseMessageDefinition[];
    security?: SecurityDefinition[];
    consumes?: string;
    produces?: string;
    type?: string;
    outType?: string;
    bindingMode?: string;
    skipBindingOnErrorCode?: boolean;
    clientRequestValidation?: boolean;
    enableCORS?: boolean;
    enableNoContentResponse?: boolean;
    apiDocs?: boolean;
    deprecated?: boolean;
    streamCache?: boolean;
    routeId?: string;
    constructor(init?: Partial<GetDefinition>);
}
export declare class HeadDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    path?: string;
    to?: string;
    param?: ParamDefinition[];
    responseMessage?: ResponseMessageDefinition[];
    security?: SecurityDefinition[];
    consumes?: string;
    produces?: string;
    type?: string;
    outType?: string;
    bindingMode?: string;
    skipBindingOnErrorCode?: boolean;
    clientRequestValidation?: boolean;
    enableCORS?: boolean;
    enableNoContentResponse?: boolean;
    apiDocs?: boolean;
    deprecated?: boolean;
    streamCache?: boolean;
    routeId?: string;
    constructor(init?: Partial<HeadDefinition>);
}
export declare class MutualTLSDefinition extends CamelElement {
    stepName?: string;
    description?: string;
    key: string;
    constructor(init?: Partial<MutualTLSDefinition>);
}
export declare class OAuth2Definition extends CamelElement {
    stepName?: string;
    authorizationUrl?: string;
    description?: string;
    flow?: string;
    key: string;
    refreshUrl?: string;
    scopes?: RestPropertyDefinition[];
    tokenUrl?: string;
    constructor(init?: Partial<OAuth2Definition>);
}
export declare class OpenApiDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    specification: string;
    routeId?: string;
    missingOperation?: string;
    mockIncludePattern?: string;
    constructor(init?: Partial<OpenApiDefinition>);
}
export declare class OpenIdConnectDefinition extends CamelElement {
    stepName?: string;
    description?: string;
    key: string;
    url: string;
    constructor(init?: Partial<OpenIdConnectDefinition>);
}
export declare class ParamDefinition extends CamelElement {
    stepName?: string;
    description?: string;
    name: string;
    type?: string;
    defaultValue?: string;
    required?: boolean;
    collectionFormat?: string;
    arrayType?: string;
    dataType?: string;
    dataFormat?: string;
    allowableValues?: string[];
    examples?: RestPropertyDefinition[];
    constructor(init?: Partial<ParamDefinition>);
}
export declare class PatchDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    path?: string;
    to?: string;
    param?: ParamDefinition[];
    responseMessage?: ResponseMessageDefinition[];
    security?: SecurityDefinition[];
    consumes?: string;
    produces?: string;
    type?: string;
    outType?: string;
    bindingMode?: string;
    skipBindingOnErrorCode?: boolean;
    clientRequestValidation?: boolean;
    enableCORS?: boolean;
    enableNoContentResponse?: boolean;
    apiDocs?: boolean;
    deprecated?: boolean;
    streamCache?: boolean;
    routeId?: string;
    constructor(init?: Partial<PatchDefinition>);
}
export declare class PostDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    path?: string;
    to?: string;
    param?: ParamDefinition[];
    responseMessage?: ResponseMessageDefinition[];
    security?: SecurityDefinition[];
    consumes?: string;
    produces?: string;
    type?: string;
    outType?: string;
    bindingMode?: string;
    skipBindingOnErrorCode?: boolean;
    clientRequestValidation?: boolean;
    enableCORS?: boolean;
    enableNoContentResponse?: boolean;
    apiDocs?: boolean;
    deprecated?: boolean;
    streamCache?: boolean;
    routeId?: string;
    constructor(init?: Partial<PostDefinition>);
}
export declare class PutDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    path?: string;
    to?: string;
    param?: ParamDefinition[];
    responseMessage?: ResponseMessageDefinition[];
    security?: SecurityDefinition[];
    consumes?: string;
    produces?: string;
    type?: string;
    outType?: string;
    bindingMode?: string;
    skipBindingOnErrorCode?: boolean;
    clientRequestValidation?: boolean;
    enableCORS?: boolean;
    enableNoContentResponse?: boolean;
    apiDocs?: boolean;
    deprecated?: boolean;
    streamCache?: boolean;
    routeId?: string;
    constructor(init?: Partial<PutDefinition>);
}
export declare class ResponseHeaderDefinition extends CamelElement {
    stepName?: string;
    description?: string;
    name: string;
    collectionFormat?: string;
    arrayType?: string;
    dataType?: string;
    dataFormat?: string;
    allowableValues?: string[];
    example?: string;
    constructor(init?: Partial<ResponseHeaderDefinition>);
}
export declare class ResponseMessageDefinition extends CamelElement {
    stepName?: string;
    code?: string;
    message: string;
    responseModel?: string;
    header?: ResponseHeaderDefinition[];
    examples?: RestPropertyDefinition[];
    constructor(init?: Partial<ResponseMessageDefinition>);
}
export declare class RestBindingDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    consumes?: string;
    produces?: string;
    bindingMode?: string;
    type?: string;
    outType?: string;
    skipBindingOnErrorCode?: boolean;
    clientRequestValidation?: boolean;
    enableCORS?: boolean;
    enableNoContentResponse?: boolean;
    component?: string;
    constructor(init?: Partial<RestBindingDefinition>);
}
export declare class RestConfigurationDefinition extends CamelElement {
    stepName?: string;
    component?: string;
    apiComponent?: string;
    producerComponent?: string;
    scheme?: string;
    host?: string;
    port?: string;
    apiHost?: string;
    useXForwardHeaders?: boolean;
    producerApiDoc?: string;
    contextPath?: string;
    apiContextPath?: string;
    apiContextRouteId?: string;
    apiVendorExtension?: boolean;
    hostNameResolver?: string;
    bindingMode?: string;
    bindingPackageScan?: string;
    skipBindingOnErrorCode?: boolean;
    clientRequestValidation?: boolean;
    enableCORS?: boolean;
    enableNoContentResponse?: boolean;
    inlineRoutes?: boolean;
    jsonDataFormat?: string;
    xmlDataFormat?: string;
    componentProperty?: RestPropertyDefinition[];
    endpointProperty?: RestPropertyDefinition[];
    consumerProperty?: RestPropertyDefinition[];
    dataFormatProperty?: RestPropertyDefinition[];
    apiProperty?: RestPropertyDefinition[];
    corsHeaders?: RestPropertyDefinition[];
    constructor(init?: Partial<RestConfigurationDefinition>);
}
export declare class RestDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
    path?: string;
    consumes?: string;
    produces?: string;
    bindingMode?: string;
    skipBindingOnErrorCode?: boolean;
    clientRequestValidation?: boolean;
    enableCORS?: boolean;
    enableNoContentResponse?: boolean;
    apiDocs?: boolean;
    tag?: string;
    openApi?: OpenApiDefinition;
    securityDefinitions?: RestSecuritiesDefinition;
    securityRequirements?: SecurityDefinition[];
    delete?: DeleteDefinition[];
    get?: GetDefinition[];
    head?: HeadDefinition[];
    patch?: PatchDefinition[];
    post?: PostDefinition[];
    put?: PutDefinition[];
    constructor(init?: Partial<RestDefinition>);
}
export declare class RestPropertyDefinition extends CamelElement {
    stepName?: string;
    key: string;
    value: string;
    constructor(init?: Partial<RestPropertyDefinition>);
}
export declare class RestSecuritiesDefinition extends CamelElement {
    stepName?: string;
    apiKey?: ApiKeyDefinition;
    basicAuth?: BasicAuthDefinition;
    bearer?: BearerTokenDefinition;
    mutualTLS?: MutualTLSDefinition;
    oauth2?: OAuth2Definition;
    openIdConnect?: OpenIdConnectDefinition;
    constructor(init?: Partial<RestSecuritiesDefinition>);
}
export declare class RestsDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    description?: string;
    rest?: RestDefinition[];
    constructor(init?: Partial<RestsDefinition>);
}
export declare class SecurityDefinition extends CamelElement {
    stepName?: string;
    key: string;
    scopes?: string;
    constructor(init?: Partial<SecurityDefinition>);
}
export declare class LangChain4jCharacterTokenizerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    tokenizerType?: string;
    maxTokens: number;
    maxOverlap: number;
    constructor(init?: Partial<LangChain4jCharacterTokenizerDefinition>);
}
export declare class LangChain4jLineTokenizerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    tokenizerType?: string;
    maxTokens: number;
    maxOverlap: number;
    constructor(init?: Partial<LangChain4jLineTokenizerDefinition>);
}
export declare class LangChain4jParagraphTokenizerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    tokenizerType?: string;
    maxTokens: number;
    maxOverlap: number;
    constructor(init?: Partial<LangChain4jParagraphTokenizerDefinition>);
}
export declare class LangChain4jSentenceTokenizerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    tokenizerType?: string;
    maxTokens: number;
    maxOverlap: number;
    constructor(init?: Partial<LangChain4jSentenceTokenizerDefinition>);
}
export declare class LangChain4jTokenizerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    maxOverlap: number;
    maxTokens: number;
    tokenizerType?: string;
    constructor(init?: Partial<LangChain4jTokenizerDefinition>);
}
export declare class LangChain4jWordTokenizerDefinition extends CamelElement {
    stepName?: string;
    id?: string;
    tokenizerType?: string;
    maxTokens: number;
    maxOverlap: number;
    constructor(init?: Partial<LangChain4jWordTokenizerDefinition>);
}
export declare class CustomTransformerDefinition extends CamelElement {
    stepName?: string;
    className?: string;
    fromType?: string;
    name?: string;
    ref?: string;
    scheme?: string;
    toType?: string;
    constructor(init?: Partial<CustomTransformerDefinition>);
}
export declare class DataFormatTransformerDefinition extends CamelElement {
    stepName?: string;
    asn1?: ASN1DataFormat | string;
    avro?: AvroDataFormat | string;
    barcode?: BarcodeDataFormat;
    base64?: Base64DataFormat;
    beanio?: BeanioDataFormat;
    bindy?: BindyDataFormat;
    cbor?: CBORDataFormat;
    crypto?: CryptoDataFormat;
    csv?: CsvDataFormat | string;
    custom?: CustomDataFormat | string;
    fhirJson?: FhirJsonDataFormat;
    fhirXml?: FhirXmlDataFormat;
    flatpack?: FlatpackDataFormat;
    fury?: FuryDataFormat;
    grok?: GrokDataFormat;
    gzipDeflater?: GzipDeflaterDataFormat;
    hl7?: HL7DataFormat;
    ical?: IcalDataFormat;
    jacksonXml?: JacksonXMLDataFormat;
    jaxb?: JaxbDataFormat;
    json?: JsonDataFormat;
    jsonApi?: JsonApiDataFormat;
    lzf?: LZFDataFormat;
    mimeMultipart?: MimeMultipartDataFormat;
    parquetAvro?: ParquetAvroDataFormat | string;
    pgp?: PGPDataFormat;
    protobuf?: ProtobufDataFormat | string;
    rss?: RssDataFormat;
    smooks?: SmooksDataFormat;
    soap?: SoapDataFormat | string;
    swiftMt?: SwiftMtDataFormat | string;
    swiftMx?: SwiftMxDataFormat;
    syslog?: SyslogDataFormat;
    tarFile?: TarFileDataFormat;
    thrift?: ThriftDataFormat | string;
    tidyMarkup?: TidyMarkupDataFormat;
    univocityCsv?: UniVocityCsvDataFormat;
    univocityFixed?: UniVocityFixedDataFormat;
    univocityTsv?: UniVocityTsvDataFormat;
    xmlSecurity?: XMLSecurityDataFormat;
    yaml?: YAMLDataFormat;
    zipDeflater?: ZipDeflaterDataFormat;
    zipFile?: ZipFileDataFormat;
    fromType?: string;
    name?: string;
    scheme?: string;
    toType?: string;
    constructor(init?: Partial<DataFormatTransformerDefinition>);
}
export declare class EndpointTransformerDefinition extends CamelElement {
    stepName?: string;
    fromType?: string;
    name?: string;
    ref?: string;
    scheme?: string;
    toType?: string;
    uri?: string;
    constructor(init?: Partial<EndpointTransformerDefinition>);
}
export declare class LoadTransformerDefinition extends CamelElement {
    stepName?: string;
    defaults?: boolean;
    fromType?: string;
    name?: string;
    packageScan?: string;
    scheme?: string;
    toType?: string;
    constructor(init?: Partial<LoadTransformerDefinition>);
}
export declare class TransformersDefinition extends CamelElement {
    stepName?: string;
    customTransformer?: CustomTransformerDefinition;
    dataFormatTransformer?: DataFormatTransformerDefinition;
    endpointTransformer?: EndpointTransformerDefinition;
    loadTransformer?: LoadTransformerDefinition;
    constructor(init?: Partial<TransformersDefinition>);
}
export declare class CustomValidatorDefinition extends CamelElement {
    stepName?: string;
    className?: string;
    ref?: string;
    type?: string;
    constructor(init?: Partial<CustomValidatorDefinition>);
}
export declare class EndpointValidatorDefinition extends CamelElement {
    stepName?: string;
    ref?: string;
    type?: string;
    uri?: string;
    constructor(init?: Partial<EndpointValidatorDefinition>);
}
export declare class PredicateValidatorDefinition extends CamelElement {
    stepName?: string;
    expression?: ExpressionDefinition;
    type?: string;
    constructor(init?: Partial<PredicateValidatorDefinition>);
}
export declare class ValidatorsDefinition extends CamelElement {
    stepName?: string;
    customValidator?: CustomValidatorDefinition;
    endpointValidator?: EndpointValidatorDefinition;
    predicateValidator?: PredicateValidatorDefinition;
    constructor(init?: Partial<ValidatorsDefinition>);
}
