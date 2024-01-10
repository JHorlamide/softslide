// const mainRequests = [
//   {
//     createShape: {
//       objectId: elementId,
//       shapeType: 'TEXT_BOX',
//       elementProperties: {
//         pageObjectId: slideId,
//         size: { height: pt350, width: pt350 },
//         transform: {
//           scaleX: 1,
//           scaleY: 1,
//           translateX: 50,
//           translateY: 500,
//           unit: 'PT',
//         },
//       },
//     },
//   },

//   /* Insert text into the box, using the supplied element ID. */
//   {
//     insertText: {
//       objectId: elementId,
//       insertionIndex: 0,
//       text: comments,
//     },
//   },
// ];

// const requests = [
//   {
//     createShape: {
//       objectId: 'text-box',
//       shapeType: 'TEXT_BOX',
//       elementProperties: {
//         pageObjectId: "pageId",
//         size: {
//           width: { magnitude: 400, unit: 'PT' },
//           height: { magnitude: 50, unit: 'PT' },
//         },
//         transform: {
//           scaleX: 1,
//           scaleY: 1,
//           translateX: 50,
//           translateY: 500,
//           unit: 'PT',
//         },
//       },
//     },
//   },

//   {
//     insertText: {
//       objectId: "textBoxId",
//       text: "comment",
//     }
//   }
// ];


// const createCommentary = (comment: string, presentationId: string, pageId: string) => {
//   const requests = [
//     {
//       createShape: {
//         objectId: 'text-box',
//         shapeType: 'TEXT_BOX',
//         elementProperties: {
//           pageObjectId: pageId,
//           size: {
//             width: { magnitude: 400, unit: 'PT' },
//             height: { magnitude: 50, unit: 'PT' },
//           },
//           transform: {
//             scaleX: 1,
//             scaleY: 1,
//             translateX: 50,
//             translateY: 500,
//             unit: 'PT',
//           },
//         },
//       },
//     },
//   ];

//   try {
//     const response = await this.slideService.presentations.batchUpdate({
//       presentationId,
//       requestBody: { requests }
//     });

//     const replies = response.data.replies;
//     if (replies?.length === 0) {
//       throw new ClientError("Requested entity was not found.");
//     }

//     const textBoxId = replies && replies[0].createSlide?.objectId;
//     await this.slideService.presentations.batchUpdate({
//       presentationId,
//       requestBody: {
//         requests: [
//           {
//             insertText: {
//               objectId: textBoxId,
//               text: comment,
//             }
//           }
//         ]
//       }
//     })
//   } catch (error: any) {
//     if (error.message === "Requested entity was not found.") {
//       throw new ClientError(error.message);
//     };

//     throw new ServerError(error.message);
//   }
// }
