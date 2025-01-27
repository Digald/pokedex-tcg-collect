import { useEffect, useState } from "react";
import Link from "next/link";
import DeployButton from "@/components/deploy-button";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";

export function Nav() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={"/"}>PokeDex TCG Collection</Link>
          {/* <div className="flex items-center gap-2">
            <DeployButton />
          </div> */}
        </div>
        {/* {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />} */}
      </div>
    </nav>
  );
}
