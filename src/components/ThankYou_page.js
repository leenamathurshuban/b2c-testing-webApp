import { Container, Button } from "react-bootstrap";
import { useRouter } from "next/router";

function ThankYouPage() {
  const router = useRouter();
  return (
    <>
      <Container>
        <div className="file-repair-full">
          <div className="main_heading inner_gheading">
            <h1>
              <span>Thank You </span>
            </h1>
            <p className="mb-4">
              Thank you for connecting with us, we will get back to you soon!
            </p>
            <div className="repair-btn">
              <Button
                className="main_btn hvr-shutter-out-horizontal btn btn-primary"
                onClick={() => router.replace("/")}
              >
                Home
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ThankYouPage;
