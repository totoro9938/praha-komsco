package com.cp.praha.common.util;

public class Cond {
    public static StrCond str(String s) {
        return new StrCond(s);
    }

    public static class StrCond {
        private String value;

        public StrCond(String value) {
            this.value = value;
        }

        public boolean in(String ... values) {
            for (String v : values) {
                if (v.equals(value)) return true;
            }
            return false;
        }

        public boolean notIn(String ... values) {
            for (String v : values) {
                if (v.equals(value)) return false;
            }
            return true;
        }
    }
}
