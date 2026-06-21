/**
 * keep — ambient declaration for the type-less `to-ico` CommonJS package;
 * required by scripts/gen-favicons.ts.
 */
declare module 'to-ico' {
  function toIco(
    buffers: Buffer[],
    options?: { resize?: boolean; sizes?: number[] },
  ): Promise<Buffer>;
  export default toIco;
}
