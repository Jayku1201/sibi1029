export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/#about',
      permanent: false
    }
  };
}

export default function AboutRedirect() {
  return null;
}
