import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card";
import { Field, Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4">
      <Card className="w-full max-w-sm">
        <CardBody className="space-y-5 py-8">
          <div className="text-center">
            <Link href="/" className="text-2xl" aria-hidden>
              🧺
            </Link>
            <h1 className="mt-2 text-lg font-semibold text-stone-900">Sign in to Kasuwa</h1>
            <p className="mt-1 text-sm text-stone-500">
              UI only for now — real auth lands at Track A level A1.
            </p>
          </div>

          <Button variant="secondary" className="w-full" icon={<span aria-hidden>G</span>}>
            Continue with Google
          </Button>

          <div className="flex items-center gap-3 text-xs text-stone-400">
            <span className="h-px flex-1 bg-stone-200" />
            or
            <span className="h-px flex-1 bg-stone-200" />
          </div>

          <form className="space-y-3">
            <Field label="Email" htmlFor="email">
              <Input id="email" type="email" placeholder="you@example.com" />
            </Field>
            <Button type="submit" className="w-full">
              Send magic link
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
