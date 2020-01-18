export default function geo() {
  const { options } = this;
  const { dotsQuantity } = options;
  const thetasLength = Math.round(Math.sqrt(dotsQuantity));
  return Array(thetasLength)
    .fill(null)
    .map(function getTheta(noop, index) {
      return Math.PI * (index / (thetasLength - 1)) - Math.PI * 0.5;
    })
    .map(function getPhis(theta, thetaIndex) {
      const maxPhis = (thetasLength - 1) * (Math.PI * 0.5);
      const phisLength = Math.round(
        Math.cos(theta) * (maxPhis * (Math.PI / 2)) +
          maxPhis * (Math.abs(thetaIndex / (thetasLength - 1) - 0.5) * 2)
      );
      const phis = Array(phisLength)
        .fill(null)
        .map(function getPhi(noop, phiIndex) {
          return Math.PI * 2 * (phiIndex / (phisLength - 1));
        });
      return { theta, phis };
    });
}
