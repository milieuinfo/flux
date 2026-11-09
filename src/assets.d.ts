// Een afbeelding importeren geeft haar url: Webpack zet ze naast de bundel, met een hash in haar naam.
declare module '*.png' {
    const url: string;
    export default url;
}

declare module '*.svg' {
    const url: string;
    export default url;
}
